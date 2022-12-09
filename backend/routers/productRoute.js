const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReview,
  deleteReview,
  getAdminProduct,
  getRelatedProduct,
} = require("../controllers/productController");
const { isAuthenticcatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProduct);
router.route("/product/related-product").get(getRelatedProduct);

//Admin
router
  .route("/admin/products")
  .get(isAuthenticcatedUser, authorizeRoles("admin"), getAdminProduct);

router
  .route("/admin/product/new")
  .post(isAuthenticcatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticcatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticcatedUser, authorizeRoles("admin"), deleteProduct);

//Seller
router
  .route("/seller/products")
  .get(isAuthenticcatedUser, authorizeRoles("seller"), getAdminProduct);

router
  .route("/seller/product/new")
  .post(isAuthenticcatedUser, authorizeRoles("seller"), createProduct);

router
  .route("/seller/product/:id")
  .put(isAuthenticcatedUser, authorizeRoles("seller"), updateProduct)
  .delete(isAuthenticcatedUser, authorizeRoles("seller"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticcatedUser, createProductReview);

router
  .route("/reviews")
  .get(getAllReview)
  .delete(isAuthenticcatedUser, deleteReview);

module.exports = router;
