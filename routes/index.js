const express = require("express");
const router = express();
const isLoggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error });
})

router.get("/shop", isLoggedin, async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success"); 
    res.render("shop", { products,success });
})

router.get("/addtocart/:id", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();
    req.flash("Success", "Product added to cart")
    res.redirect("/shop"); 
})

router.get("/cart", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    let totalmrp = 0;
    let totaldiscount = 0;
    user.cart.forEach(function(sum) {
        totalmrp += sum.price;
        totaldiscount += sum.discount; 
    })
    let totalamount = totalmrp - totaldiscount + 20;
    res.render("cart", { user, totalmrp, totaldiscount, totalamount });
})

router.post("/cart/delete/:productid", isLoggedin, async (req, res) => {
    let productId = req.params.productid;
    
    await userModel.findByIdAndUpdate( req.user._id, { $pull: { cart: productId } });
    res.redirect("/cart");
})

router.get("/cart/update/:productid", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let item = user.cart.find(item => item.product.toString() === req.params.productid);
    item.quantity += 1;
    await user.save();
    res.redirect("/cart");
})



router.get("/logout", isLoggedin, (req, res) => {
    res.render("shop");
})



module.exports = router;


