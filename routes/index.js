const express = require("express");
const router = express();
const isLoggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error });
})

router.get("/shop", isLoggedin, async (req, res) => {
    let products = await productModel.find();
    res.render("shop", { products });
})

router.get("/logout", isLoggedin, (req, res) => {
    res.render("shop");
})


//1:05:50



module.exports = router;


