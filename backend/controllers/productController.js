const Product = require("../models/productModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsynsError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//Create Product - Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.file.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.User.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all Product
exports.getAllProduct = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query.clone();

  let filteredProductsCount = products.length;

  apiFeatures.pagination(resultPerPage);

  products = await apiFeatures.query;

  res.status(201).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//Related Product
exports.getRelatedProduct = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({
    $or: [{ Stock: { $gt: 1 } }, { price: { $lt: 1000000 } }],
  })
    .sort("price")
    .limit(4)
    .skip(0);

  res.status(201).json({
    success: true,
    products,
  });
});

//Get all Product (Admin)
exports.getAdminProduct = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(201).json({
    success: true,
    products,
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Không có Sản phẩm này", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Không có Sản phẩm này", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidator: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Không có Sản phẩm này", 404));
  }

  //Xoa hinh anh tren Cloudinary
  for (let i = 0; i < product.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Sản phẩm Xóa Sucess",
  });
});

///Create new Review of Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.User._id,
    name: req.User.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.User.toString() === req.User._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.User.toString() === req.User._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

///Get All Review of a Product
exports.getAllReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new errorHandler("Không có Sản phẩm này", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

///Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new errorHandler("Không có Sản phẩm này", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
