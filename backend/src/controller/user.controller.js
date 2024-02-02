import {User} from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {uploadToCloudinary,deleteFromCloudinary} from '../utils/cloudinary.js'
import { regexEmail } from '../contants.js';
import Jwt from  'jsonwebtoken';

const generateAcessTokenAndRefreshToken = async (userId)=>{
    try {
         const user = await User.findById(userId);
         const accessToken = user.generateAcessToken()
         const refreshToken = user.generateRefreshToken()
         user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});
         return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Unable to generate access and refresh Token")
    }
}
const registerUser = asyncHandler(async(req,res)=>{  
    const {username,email,password} = req.body;
    const avatar='';
    if ([username,email,password].some((field)=>field.trim()=="")) {
        throw new ApiError(400,"All field are required")
    }
    if(regexEmail.test(email)===false){
        throw new ApiError(400,"Invalid email")
    }
    const user = await User.findOne({$or:[{username},{email}]});
    if(user){
        throw new ApiError(409,"User with this email or username already  exsist")
    }
    if(req.file){
        const avatarLocalPath = req.file?.path;
       if(!avatarLocalPath){
        throw new ApiError(400,"Unable to upload image to local server")
       }
       const avatar = await uploadToCloudinary(avatarLocalPath);
       if(!avatarLocalPath){
        throw new ApiError(400,"Unable to upload image to  server");
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
        throw new ApiError(500,"User was not created")
    }
     res.status(200).json(
        new ApiResponse(200,userCreated,"User registered successfully")
     )
})

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email && !password){
        throw new ApiError(400,"Email and password is required");
    }
    if(regexEmail.test(email)===false){
        throw new ApiError(400,"Invalid email")
    }
    
    const userExsist = await User.findOne({email});
    if(!userExsist){
        throw new ApiError(400,"Incorrect email")
    }
   const inputPassword = await userExsist.isPasswordCorrect(password);
   if(inputPassword===false){
    throw new ApiError(400,"Incorrect password")
   }
   const {accessToken,refreshToken} = await generateAcessTokenAndRefreshToken(userExsist._id);
   const user = await User.findById(userExsist._id).select("-password -refreshToken");
   res.status(200)
      .cookie("accessToken",accessToken,{httpOnly:true})
      .cookie("refreshToken",refreshToken,{httpOnly:true})
      .json(new ApiResponse(200,{user,accessToken:accessToken,refreshToken:refreshToken},"logged in successfully"))
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

const updateDetail = asyncHandler(async (req,res)=>{
    const {username} = req.body;
     if(!username && !req.file){
        throw new ApiError(400,"Username or avatar is required to update");
     }
     const updateField = {}
    if(username){
         updateField.username = username;
    }
    if(req.file){

        const getPrevAvatar = await User.findById(req.user?._id);
        if(!getPrevAvatar){
            throw new ApiError(500,"Unable to fetch user")
        }
        const removePrevAvatar = await deleteFromCloudinary(getPrevAvatar.avatar);
        if(!removePrevAvatar){
            throw new ApiError(500,"unable to remove prev image");
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
        throw new ApiError(400,"Unable to update the user")
    }
   res.status(200)
      .json(new ApiResponse(200,user,"Username updated successfully"))
})

const refreshAccessToken = asyncHandler (async (req,res)=>{
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,"Uauthorized request")
    }
   try {
     const decodedRefreshToken  = Jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
     const user = await User.findById(decodedRefreshToken?._id);
     if(!user){
         throw new ApiError(401,"invalid refresh Token");
     }
     if(incomingRefreshToken !== user.refreshToken){
         throw new ApiError(401,"Refresh Token is expired")
     }
     const option = {
         httpOnly:true,
     }
         const {accessToken,newRefreshToken}=  await generateAcessTokenAndRefreshToken(user?._id);
     res.status(200) 
        .cookie("accessToken",accessToken,option)
        .cookie("refreshToken",newRefreshToken,option)
        .json(new ApiResponse(200,{accessToken,refreshToken:newRefreshToken} ,"access Token refreshed successfully"))
   } catch (error) {
      throw new ApiError(401,error?.message|| "invalid refresh token")
   }

})

export {registerUser,loginUser,logOut,updateDetail,refreshAccessToken}