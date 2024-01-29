import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js';
import {Note} from '../models/note.model.js';
import { isValidObjectId } from 'mongoose';

const createNote = asyncHandler(async (req,res)=>{
    const {title,content} = req.body;
    if(!(title || content)){
        throw new ApiError(400,"Both Title and content is required");
    }
    const note= await Note.findOne({title});
    if(note){
        throw new ApiError(400,"This Title already exsist");
    }
    const createNote = await Note.create({
        title,
        content,
        owner:req.user?._id
    })
    const checkCreated = await Note.findById(createNote?._id);
    if(!checkCreated){
        throw new ApiError(500,"Note was not created")
    }
    res.status(200).json(new ApiResponse(200,checkCreated,"Note created successfully"))
})

const updateNote = asyncHandler(async (req,res)=>{
    const {title,content} = req.body;
    const {noteId}= req.params;
    if(!title || !content){
        throw new ApiError(400,"Title or content is required to update")
    }
    if(!isValidObjectId(noteId)){
        throw new ApiError(400,"Note Id is invalid")
    }

    const note= await Note.findById(noteId);
    if(!note){
        throw new ApiError(500,"Unable to find note")
    }
    const updateNoteDetail = await Note.findByIdAndUpdate(noteId,{
        $set:{title,content}
    },{new:true})
    if(!updateNoteDetail){
        throw new ApiError(500,"Note was not Updated")
    }
    res.status(200).json(new ApiResponse(200,"Note updated successfully"))
   
})


const deleteNote = asyncHandler(async (req,res)=>{
     const {noteId}= req.params;
     if(!isValidObjectId(noteId)){
        throw new ApiError(400,"Note Id is invalid")
    }
    const result = await Note.deleteOne({_id:noteId})
    if(!result){
        throw new ApiError(500,"Unable to delete note")
    }
    res.status(200).json(new ApiResponse(200,"Note deleted successfully"))
})

const displayNote = asyncHandler(async (req,res)=>{
      const note = await Note.find({owner:req.user?._id});
      if(!note){
        throw new ApiError(500,"Unable to fetch notes")
      }
      if(note.length===0){
        return res.status(200).json(new ApiResponse(200,"User have 0 notes"))
      }
      res.status(200).json(new ApiResponse(200,note,"Notes fetched successfully"))
})
const displaySpecificNote = asyncHandler(async (req,res)=>{
    const {noteId} = req.params;
    if(!isValidObjectId(noteId)){
        throw new ApiError(400,"Note Id is invalid")
    }
    const note = await Note.findById(noteId).select("title content");
    if(!note){
        throw new ApiError(500,"Unable to find specified note");
    }
   res.status(200).json(new ApiResponse(200,note,"note fetched successfully"))
})

export {createNote,updateNote,deleteNote,displayNote,displaySpecificNote}