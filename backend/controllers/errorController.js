const AppError = require('./../utils/appError');

// Duplicate Errors
const handleDuplicateError = (error) => {
    let keyValue = '', count = 0;
    for(let property in error.keyValue) {
        if(count === 0){
            keyValue += `${property}: ${error.keyValue[property]}`;
        }else {
            keyValue += ` and ${property}: ${error.keyValue[property]}`;
        }
        count++;
    }
    let message = `${keyValue} already exists. Try again with different values`;
    return new AppError(message, 400);
}


// Handle validation errors
const handleValidatorError = error => {
    // console.log(error);
    let message = '';
    if(error.code = 'ERR_ASSERTION') {
        message = 'Invalid data type: ';
    }
    
    message += error.message.replace('Car validation failed:', '');


    return new AppError(message, 400)
}


// Handle incorrect ids errors
const handleIdError = error => {
    let message = `The object with ${error.path}: ${error.value} doesn't exists`;
    return new AppError(message, 400);
}


// Handle JWT Error
const handleJWTError = error => {
    let message = 'Invalid login token. Please login again to gain access';

    return new AppError(message, 401);
}



/********** Send errors in development env *******/
const sendErrorDev = (err, req, res) => {
    console.log(err);

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        // err
    });

}


/********** Send errors in production env *******/
const sendErrorProd = (err, req, res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }else {
        res.status(err.statusCode).json({
            status: err.status,
            message: "Sorry, but something went wrong."
        });
    }
}



/********** Main error handler function *******/
module.exports = (err, req, res, next) =>{
    // res.status(500).json({
    //     err
    // });
    // return false;
    if(err){
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';
    
        if(process.env.NODE_ENV === 'development') {
            sendErrorDev(err, req, res);
        }else if(process.env.NODE_ENV === 'production') {
            // res.json({
            //     err: err
            // });
    
            let error = {...err};
            error.message = err.message;
    
            // console.log(error);
            if(error.code === 11000) {
                error = handleDuplicateError(error);
            }else if(error.path === '_id') {
                error = handleIdError(error);
            }else if(error.name === 'ValidatorError'){
                error = handleValidatorError(error);
            }else if(error.name === 'JsonWebTokenError') {
                error = handleJWTError(error);
            }
    
            // console.log(error);
            sendErrorProd(error, req, res);
        }
    }

    
}