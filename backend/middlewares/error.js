const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;

    err = new errorHandler(message, 400);
  }

  //Mongoose Duplicate(trung lap) key error
  if (err.code === 11000) {
    const message = `Da co ${Object.keys(err.keyValue)} nay ton tai`;

    err = new errorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid,try again`;

    err = new errorHandler(message, 400);
  }

  //JWT Expire error
  if (err.name === "TokenExpireError") {
    const message = `Json Web Token is Expire,try again`;

    err = new errorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
