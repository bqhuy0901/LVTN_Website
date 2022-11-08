const express = require("express");
const router = express.Router();
const { isAuthenticcatedUser } = require("../middlewares/auth");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");

router.route("/payment/process").post(isAuthenticcatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticcatedUser, sendStripeApiKey);

module.exports = router;
