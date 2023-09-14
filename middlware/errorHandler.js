const { constants } = require('../constants')

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR: {
            return res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stackTrace });
        }
        case constants.NOT_FOUND: {
            return res.json({ title: "Not Found", message: err.message, stackTrace: err.stackTrace });
        }
        case constants.FORBIDDEN: {
            return res.json({ title: "Forbidden", message: err.message, stackTrace: err.stackTrace });
        }
        case constants.UNAUTHORIZED: {
            return res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stackTrace });
        }
        case constants.SERVER_ERROR: {
            return res.json({ title: "Server Error", message: err.message, stackTrace: err.stackTrace });
        }
        default: {
            console.log('All good');
            return res.status(statusCode).json({ title: "Unknown Error", message: err.message, stackTrace: err.stackTrace });
        }
    }
}

module.exports = errorHandler;
