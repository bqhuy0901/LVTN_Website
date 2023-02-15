const catchAsyncError = require("../middlewares/catchAsynsError");

// const stripe = require("stripe")("process.env.STRIPE_SECRET_KEY");
const stripe = require("stripe")(
  "sk_test_51KcptlCoojVrk3Jm68TvjbLvX6xWYmiXOCI6HhKn5JJdvvaPBW1I8YQJgE92w704p4rLjgMY5mxsyeKcVdvadY4H00FTH25lbS"
);
exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    // amount: req.body.amount
    amount: 20000000,
    currency: "VND",
    metadata: {
      company: "Ecommerce",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
