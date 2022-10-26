const Category = require("../models/categoryModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsynsError");

//Create Category - Admin
exports.createCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    success: true,
    category,
  });
});

//Get all Category
exports.getAllCategory = catchAsyncError(async (req, res) => {
  const category = await Category.find();

  res.status(200).json({
    success: true,
    category,
  });
});

//Get Caterogy Details
exports.getCategoryDetails = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate("user");

  if (!category) {
    return next(new errorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

//Update Category -- Admin

exports.updateCategory = catchAsyncError(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new errorHandler("Category not found", 404));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidator: true,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

//Delete Category

exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new errorHandler("Category not found", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Category Delete Sucess",
  });
});
