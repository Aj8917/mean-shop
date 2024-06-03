const notFound=(req,res,next)=>{
    const error = new Error(`No Found - ${req.origianlUrl}`);
    res.status(404);
    next(error);
};

const errorHandler=(err,req,res,next)=>{
    let statusCode = res.statusCode === 200 ? 500 :res.statusCode;
    let message =err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message='Resource Not Found';
        statusCode=404;
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? ' pie ' : err.stack,
    });
};

export  {notFound,errorHandler} ;