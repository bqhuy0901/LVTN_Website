const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
// app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Import
const product = require("./routers/productRoute");
const user = require("./routers/userRoute");
const order = require("./routers/orderRoute");
const payment = require("./routers/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
