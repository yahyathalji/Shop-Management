import {Request ,Response , NextFunction} from 'express'

const notFound = (req:Request , res:Response , next:NextFunction)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler =(err:Error,req:Request,res:Response,next:NextFunction) =>{
    const statusCode= res.statusCode ===200 ? 500 : res.statusCode;
    res.status(statusCode).json({message: err.message});
};

export { notFound, errorHandler };
