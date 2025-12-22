const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("Error instance:", err);
  console.log("Is CustomAPIError?", err instanceof CustomAPIError);
  console.log("Message:", err.message);
  console.error(err);

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: Object.values(err.errors)
        .map((item) => item.message)
        .join(", "),
    });
  }

  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Duplicate value entered for field: ${field}. Please choose another value.`,
    });
  }

  if (err.name === "CastError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong, please try again later.",
  });
};

module.exports = errorHandlerMiddleware;
