import connectDB from "./db/connection.js";
import app from "./app.js";
import dotenv from 'dotenv'
dotenv.config({path:'./.env'})
const port = process.env.PORT || 8000
connectDB()
    .then(()=>{
        app.listen(port,()=>{
            console.log(`Server is listening on port: ${port}`);
        })
    })
    .catch(()=>{
        app.on('error',(error)=>{
             console.log("express error:",error);
             throw error;
        })
    })