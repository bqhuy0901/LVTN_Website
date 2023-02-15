const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cryto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hay nhap Ten"],
      maxLength: [30, "Khong duoc nhap qua 30 ky tu!"],
      minLength: [4, "Hay nhap hon 4 ky tu"],
    },
    email: {
      type: String,
      required: [true, "Hay nhap Email"],
      unique: true,
      validate: [validator.isEmail, "Hay nhap dung gia tri Email"],
    },
    password: {
      type: String,
      required: [true, "Hay nhap Mat Khau"],
      minLength: [8, "Hay nhap hon 8 ky tu"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    createAt: {
      type: Date,
      default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  { timestamps: true }
);

//ma hoa mat khau
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//Json Web Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//So Sánh Password
userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

//Dat lai Thong bao Password (Token)
userSchema.methods.getResetPasswordToken = function () {
  //Geneting token
  const resetToken = cryto.randomBytes(20).toString("hex");

  //Có và thêm resetPasswordToken to UserChema
  this.resetPasswordToken = cryto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
