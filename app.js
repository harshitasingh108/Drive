
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const dotenv = require("dotenv");
dotenv.config();

const connectToDB = require("./config/db");
connectToDB();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const indexRouter = require("./routes/index.routes");
const userRouter = require("./routes/user.routes");

app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
    console.log("server started");
});
