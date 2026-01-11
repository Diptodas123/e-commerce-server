// Generic success response
export const responseSuccess = (res, data = null, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
        status: "success",
        message,
        data
    });
};

// 200 - OK (Generic success)
export const sendSuccess = (res, data, message = "Operation successful") => {
    return responseSuccess(res, data, message, 200);
};

// 201 - Created
export const sendCreated = (res, data, message = "Resource created successfully") => {
    return responseSuccess(res, data, message, 201);
};

// 404 - Not Found
export const sendNotFound = (res, message = "Resource not found") => {
    return responseSuccess(res, null, message, 404);
}
