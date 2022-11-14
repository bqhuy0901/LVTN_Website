const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");


//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.use(express.static(path.join(__dirname, "../fontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve, "../fontend/build/index.html");
});

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
