const mongoose = require("mongoose");

let ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    isadmin: boolean,
    product: {
        type: Array,
        default: []
    },
    picture: String, 
    gstin: String
})

module.exports = mongoose.model("owner", ownerSchema);