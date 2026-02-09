// const express = require("express");
// const router = express.Router();

// const { body, validationResult } = require('express-validator');
// const userModel = require("../models/user.model")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

// router.get("/register", (req, res) => {
//     res.render("register.ejs")
// })
// router.post("/register", body('email').trim().isEmail().isLength({ min: 5 }),
//     body("password").trim().isLength({ min: 5 }),
//     body("username").trim().isLength({ min: 3 }),
//     async (req, res) => {
//         const errors = validationResult(req);
//         const { username, email, password } = req.body;
//         const hashpassword = await bcrypt.hash(password, 10)
//         console.log(req.body)
//         const newuser = await userModel.create({
//             email,
//             username,
//             password: hashpassword,
//         })
//         res.redirect("/user/login");

//     }

// )

// router.get("/login", (req, res) => {
//     res.render("login.ejs")
// })
// router.post("/login",
//     body("password").trim().isLength({ min: 5 }),
//     body("username").trim().isLength({ min: 3 }),
//     async (req, res) => {
//         const error = validationResult(req);
//         if (!error.isEmpty()) {
//             return res.status(400).json({
//                 error: error.array(),
//                 message: "invalid data"
//             })
//         }
//         const { username, password } = req.body;
//         const user = await userModel.findOne({
//             username: username
//         })
//         if (!user) {
//             return res.status(400).json({
//                 message: 'username or password is 1incorrect'
//             })
//         }
//         const isMatch = await bcrypt.compare(password, user.password)
//         if (!isMatch) {
//             return res.status(400).json({
//                 message: 'username or password is 2incorrect'
//             })
//         }
//         const token = jwt.sign({
//             userId: user._id,
//             email: user.username
//         },
//             process.env.JWT_SECRET,
//         )
//         res.cookie('token', token)
//         res.redirect("/home");
//     })
// module.exports = router;

const express = require("express");
const router = express.Router();

const { body, validationResult } = require('express-validator');
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
    res.render("register.ejs");
});

router.post("/register",
    body('email').trim().isEmail().isLength({ min: 5 }),
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().isLength({ min: 3 }),
    async (req, res) => {

        const { username, email, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email,
            username,
            password: hashpassword,
        });

        res.redirect("/user/login");
    }
);

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.post("/login",
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().isLength({ min: 3 }),
    async (req, res) => {

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array(),
                message: "invalid data"
            });
        }

        const { username, password } = req.body;
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(400).send("wrong username or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("wrong username or password");
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );

        res.cookie("token", token);
        res.redirect("/home");
    }
);

module.exports = router;








