const express = require("express");
const app = express();

// cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// dotenv
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
require("dotenv").config;

const cors = require("cors");
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3030",
        "http://127.0.0.1:3030",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://awesome-sde-2-glti.vercel.app",
        "https://awesome-sde-2.vercel.app"
    ],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const UserRouter = require("../src/domains/user/controllers/index");
app.use("/user", UserRouter);

const ProductRouter = require("../src/domains/product/controllers/index");
app.use("/product", ProductRouter);

const errorHandler = require("../src/middlewares/errorHandler");
app.use(errorHandler);
module.exports = app;
