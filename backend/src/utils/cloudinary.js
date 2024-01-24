import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import ApiError from '../utils/ApiError.js'
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


const uploadToCloudinary = async (localFilePath)=>{
     try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"image", folder:"Notes"})
        console.log("response is:",response);
        fs.unlinkSync(localFilePath)
        return response;
     } catch (error) {
        console.log("error is:",error);
        fs.unlinkSync(localFilePath)
        return null;
     }
}
const deleteFromCloudinary = async (fileUrl)=>{
     try {
         const parsedUrl = new URL(fileUrl);
         const publicId = `Notes/${parsedUrl.pathname.split('/').pop().split('.')[0]}`;
         console.log("public id is: ",publicId)
         if(!publicId){
            throw new ApiError(500,"Unable to get ApiError")
         }
         const result = await cloudinary.uploader.destroy(publicId);
         if(!result){
            throw new ApiError(500,"Unable to remove image");
         }
         return result.result;
     } catch (error) {
         console.log("Error while removing image is : ",error);
         return null;
     }
}

export {uploadToCloudinary,deleteFromCloudinary}