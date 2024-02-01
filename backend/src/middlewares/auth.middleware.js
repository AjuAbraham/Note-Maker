import {User} from '../models/user.model.js';
import Jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

const verifyLoggedIn = asyncHandler(async (req,_,next)=>{
    try {
          const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","");
          if(!accessToken){
            throw new ApiError(400,"unauthorized acess")
          }
          const decodeToken = Jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
          const user = await User.findById(decodeToken?._id).select("-refreshToken -password");
          if(!user){
             throw new ApiError(401,"Invalid access token")
          }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(400,"Invalid access")
    }
      
})

export default verifyLoggedIn;