const ErrorMiddleware = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;//If statuscode present else 500
    err.message = err.message || "Internal Server Error";//If error message presenst else "Internal Server Error" message
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}
export default ErrorMiddleware;