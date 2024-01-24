import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        unique:true,
    },
    content:{
        type:String,
        required:[true,"Content is required"],
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

export const Note = mongoose.model("Note",noteSchema);