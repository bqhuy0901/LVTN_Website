const errorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const catchAsynsError = require("../middlewares/catchAsynsError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Dang ki 1 User
exports.registerUser = catchAsynsError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//Dang nhap User

exports.loginUser = catchAsynsError(async (req, res, next) => {
  const { email, password } = req.body;

  //Kiem tram user co dung Email hoac Password ???
  if (!email || !password) {
    return next(new errorHandler("Đã có Email hoặc Password"), 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorHandler("Email hoặc Password Không hợp lệ"), 401);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new errorHandler("Email hoặc Password Không hợp lệ"), 401);
  }

  sendToken(user, 200, res);
});

//Logout
exports.logout = catchAsynsError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Đăng xuất",
  });
});

///Quen Password
exports.forgotPassword = catchAsynsError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new errorHandler(("Người dùng không được tìm thấy", 404)));
  }

  //Get ResetPassword
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = ` Thông báo Token đặt lại Password của bạn là :- \n\n ${resetPasswordUrl} \n\n Nếu bạn không yêu cầu email này sau đó, xin vui lòng bỏ qua nó `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Khôi phục mật khẩu`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `
      Thư điện tử đã được gửi đến${user.email} thành công`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExprie = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new errorHandler(error.message), 500);
  }
});

// Reset Password
exports.resetPassword = catchAsynsError(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExprie: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new errorHandler(
        "Đặt lại Token thông báo Password không hợp lệ hoặc đã hết hạn",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new errorHandler("xác nhận Mật khẩu không chính xác", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExprie = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//Get User Detail
exports.getUserDetails = catchAsynsError(async (req, res, next) => {
  const user = await User.findById(req.User.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Password
exports.updatePassword = catchAsynsError(async (req, res, next) => {
  const user = await User.findById(req.User.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new errorHandler("Mật Khẩu cũ không chính xác!"), 400);
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new errorHandler("Mật Khẩu không hợp lệ!"), 400);
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//Update User Profile
exports.updateProfile = catchAsynsError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    avatar: req.body.avatar,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.User.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.User.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Get all User --Admin
exports.getAllUser = catchAsynsError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get Single User --Admin
exports.getSinglelUsers = catchAsynsError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(errorHandler(`Không tồn tại User có :Id ${req.params.id} `));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Role --Admin
exports.updateUserRole = catchAsynsError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete User --Admin
exports.deleteUser = catchAsynsError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new errorHandler(`Người dùng không tồn tại với Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Đã xóa User thành công!",
  });
});
