"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const createHttpError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const authRoute = require("../api/v1/routes/auth.route");
const userRoute = require("../api/v1/routes/user.route");
const accessLogStream = require("../api/v1/logs/stream_logs");
const error = require("../api/v1/utils/handleError");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

app.use((req, res, next) => {
  next(createHttpError.NotFound("This route is not exit"));
});

app.use(error.handleError);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
