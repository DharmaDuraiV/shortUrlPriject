const AppError = require("../utils/appError");

// DB specific errors

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(400, message);
};

const handleDuplicateErrorDB = (err) => {
  const value = Object.values(err.keyValue).join(", ");
  const message = `Duplicate value: "${value}". Please use another value!`;
  return new AppError(409, message);
};

// Dev mode error
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Prod mode error
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      statusCode: 500,
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = err;

    if (error.code === 11000) error = handleDuplicateErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
