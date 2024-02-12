const errorHandler = (err,_,res,next)=>{
    console.log("Error stack trace:", err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal backend error"
    })
}


export default errorHandler;