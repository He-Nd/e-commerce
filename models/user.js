const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const userSchema =new mongoose.Schema(
    {
        name: String,
        password: String,
        Email: String,
        cart: [Object]
    }
);

module.exports = mongoose.model("user", userSchema);