import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error.middleware.js';
const app =express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(cookieParser());
app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static('public'));
app.set("trust proxy",1);
// routes
import userRouter from './routes/user.routes.js'
import noteRouter from './routes/note.routes.js';
app.use('/api/v1/users',userRouter);
app.use('/api/v1/notes',noteRouter);
app.use(errorHandler);
export default app;