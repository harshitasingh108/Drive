const express = require("express")
const app = express()
app.set("view engine", "ejs")
const userRouter = require('./routes/user.routes');
const dotenv = require("dotenv")
dotenv.config();
const connectToDB = require('./config/db')
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/user", userRouter);





app.listen(3000, () => {
    console.log("server started");
});

