const express = require("express");
const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetails,
} = require("../controllers/categoryController");
const { isAuthenticcatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/categories").get(getAllCategory);

router
  .route("/admin/category/new")
  .post(isAuthenticcatedUser, authorizeRoles("admin"), createCategory);

router
  .route("/admin/category/:id")
  .put(isAuthenticcatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticcatedUser, authorizeRoles("admin"), deleteCategory);

router.route("/category/:id").get(getCategoryDetails);

module.exports = router;
