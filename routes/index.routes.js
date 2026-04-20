const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/home", (req, res) => {
    if (!req.cookies.token) {
        return res.redirect("/user/login");
    }
    res.render("home");
});

router.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.redirect("/home");
});

module.exports = router;

