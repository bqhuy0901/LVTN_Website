const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSinglelUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticcatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticcatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticcatedUser, updatePassword);

router.route("/me/update").put(isAuthenticcatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticcatedUser, getAllUsers);

router
  .route("/admin/users")
  .get(isAuthenticcatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticcatedUser, authorizeRoles("admin"), getSinglelUsers)
  .put(isAuthenticcatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticcatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
