import {User} from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {uploadToCloudinary,deleteFromCloudinary} from '../utils/cloudinary.js'
import { regexEmail } from '../contants.js';
import Jwt from  'jsonwebtoken';
import { isValidObjectId } from 'mongoose';

const generateAcessTokenAndRefreshToken = async (userId)=>{
    try {
         const user = await User.findById(userId);
         const accessToken = user.generateAcessToken();
        await user.save({validateBeforeSave:false});
         return {accessToken}
    } catch (error) {
        throw new ApiError(500,"Unable to generate access and refresh Token")
    }
}
const registerUser = asyncHandler(async(req,res,next)=>{  
    const {username,email,password} = req.body;
    let avatar='';
    if ([username,email,password].some((field)=>field.trim()=="")) {
        next(new ApiError(400,"All field are required"))
    }
    if(regexEmail.test(email)===false){
        next(new ApiError(400,"Invalid email"))
    }
    const user = await User.findOne({$or:[{username},{email}]});
    if(user){
        next(new ApiError(409,"User with this email or username already  exsist"))
    }
    if(req.file){
        const avatarLocalPath = req.file?.path;
       if(!avatarLocalPath){
         throw new ApiError(500,"Unable to upload image to local server")
       }
       avatar = await uploadToCloudinary(avatarLocalPath);
       if(!avatar){
         next(new ApiError(500,"Unable to upload image to  server"))
       }
    }
    const createUser = await User.create({
        username,
        email,
        password,
        avatar: avatar?.url || ''
    });
    const userCreated = await User.findById(createUser._id).select("-password -refreshToken");
    if(!userCreated){
        next(new ApiError(500,"Some error occured while registering user"))
    }
     res.status(200).json(
        new ApiResponse(200,userCreated,"User registered successfully")
     )
})

const loginUser = asyncHandler(async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ApiError(400,"Both Email and password is required"))
    }
    if(regexEmail.test(email)===false){
       return next(new ApiError(400,"Invalid email"))
    }
    
    const userExsist = await User.findOne({email});
    if(!userExsist){
        return next(new ApiError(400,"Incorrect email"))
    }
   const inputPassword = await userExsist.isPasswordCorrect(password);
   if(inputPassword===false){
      return next(new ApiError(400,"Incorrect password"))
   }
   const {accessToken} = await generateAcessTokenAndRefreshToken(userExsist._id);
   const user = await User.findById(userExsist._id).select("-password -refreshToken");
   res.status(200)
      .cookie("accessToken",accessToken,{httpOnly:true})
      .json(new ApiResponse(200,{user,accessToken:accessToken},"logged in successfully"))
})

const logOut = asyncHandler(async (req,res)=>{
    const user = await User.findByIdAndUpdate(req.user?._id,{
        $unset:{refreshToken:1}
    },{new:true})
    if(!user){
        throw new ApiError(500,"unable to logout")
    }
     res.status(200)
        .clearCookie("refreshToken",{httpOnly:true})
        .clearCookie("accessToken",{httpOnly:true})
        .json(new ApiResponse(200,"User logged out successfully"))
})

const updateDetail = asyncHandler(async (req,res,next)=>{
    const {username} = req.body;
     if(!username && !req.file){
         next(new ApiError(400,"Username or avatar is required to update"))
     }
    const updateField = {}
    if(username){
         const exsistedUser = await User.findOne({username:username});
    if(exsistedUser){
        return next(new ApiError(400,"Username already exsist"))
    }
    updateField.username = username;
    }
    if(req.file){

        const getPrevAvatar = await User.findById(req.user?._id);
        if(!getPrevAvatar){
            throw new ApiError(500,"Unable to fetch user")
        }
        if(getPrevAvatar.avatar!==""){
            const removePrevAvatar = await deleteFromCloudinary(getPrevAvatar.avatar);
            if(!removePrevAvatar){
            throw new ApiError(500,"unable to remove prev image");
        }
        }
        const avatarLocalPath = req.file?.path;
        if(!avatarLocalPath){
            throw new ApiError(400,"unable to fetch image");
        }
        const newAvatar = await uploadToCloudinary(avatarLocalPath);
        if(!newAvatar){
            throw new ApiError(500,"Unable to upload image to server")
        }
        updateField.avatar= newAvatar.url;
    }
    const user = await User.findByIdAndUpdate(req.user?._id,{
        $set:{...updateField}
    },{new:true}).select("-password -refreshToken");
    if(!user){
         next(new ApiError(400,"Unable to update the user"))
    }
   res.status(200)
      .json(new ApiResponse(200,user,"Username updated successfully"))
})


export {registerUser,loginUser,logOut,updateDetail}