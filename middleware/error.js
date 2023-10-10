// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    // Check for specific error types and customize responses
    if (err.name === 'ValidationError') {
      statusCode = 400; // Bad Request
      message = err.message;
    } else if (err.name === 'UnauthorizedError') {
      statusCode = 401; // Unauthorized
      message = 'Unauthorized access';
    }
    res.status(statusCode).json({
      error: { 
        message: message,
      },
    });
  };
  
  module.exports = errorMiddleware;
  