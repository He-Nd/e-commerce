const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema =new mongoose.Schema(
    {
        username: String,
        password: String,
        Email: String,
        cart: [ObjectId]
    }
);

module.exports = mongoose.model("user", userSchema);