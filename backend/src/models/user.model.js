import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
   
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    avatar:{
        type:String,
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre('save',async function (next){
    if(!this.isModified("password"))next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.isPasswordCorrect = async function(password){
     return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAcessToken = function (){
   return Jwt.sign({
        _id: this._id
    },process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIERY
    }
    )
}
userSchema.methods.generateRefreshToken =function () {
    return Jwt.sign({
        _id: this._id
    },process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIERY
    }
    )
}
export const User = mongoose.model("User",userSchema);