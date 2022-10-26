const catchAsynsError = require("../middlewares/catchAsynsError");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticcatedUser = catchAsynsError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(errorHandler("Vui long dang nhap de truy cap"), 401);
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.User = await User.findById(decodeData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.User.role)) {
      return next(
        new errorHandler(
          `Role: ${req.User.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
