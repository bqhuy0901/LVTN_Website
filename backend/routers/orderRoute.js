const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticcatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticcatedUser, newOrder);

router.route("/order/:id").get(isAuthenticcatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticcatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticcatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticcatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticcatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
