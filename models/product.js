const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const productSchema =new mongoose.Schema(
    {
        name: String,
        description: String,
        img: String,
        price: Number
    }
);

module.exports = mongoose.model("product", productSchema);