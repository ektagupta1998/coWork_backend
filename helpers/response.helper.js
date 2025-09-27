
export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data,
        statusCode
    });
};


export const errorResponse = (res, error, message = 'Error', statusCode = 500) => {
    console.log("err",error)
    console.log("mss",message)
    console.log("mss",statusCode)
    return res.status(statusCode).json({
        status: 'error',
        message,
        error: error instanceof Error ? error.message : error,
        statusCode
    });
};
export const notFoundResponse = (res, message = 'Not Found', statusCode = 404) => {
    return res.status(statusCode).json({
        status: 'error',
        message,
        statusCode
        
    });
}; 
export const validationErrorResponse = (res, errors, message = 'Validation Error', statusCode = 422) => {
    return res.status(statusCode).json({
        status: 'error',
        message,
        errors,
        statusCode
    });
};