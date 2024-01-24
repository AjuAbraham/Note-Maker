import { DB_NAME } from "../contants.js";
import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        const connectionInterface = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Connected To Database!! DB HOST: ${connectionInterface.connection.host}`)
    } catch (error) {
        console.log("Unable to connect to database");
        process.exit(1);
    }
    
}
export default connectDB;