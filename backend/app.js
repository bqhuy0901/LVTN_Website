const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const coolkieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(coolkieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Import
const product = require("./routers/productRoute");
const user = require("./routers/userRoute");
const order = require("./routers/orderRoute");
const category = require("./routers/categoryRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1/", order);
app.use("/api/v1", category);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
