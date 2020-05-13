require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productModel = require("./models/product");


mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);


mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(()=>{console.log('Connected to MongoDB!')})
.catch(()=>{console.error('MongoDB connection error!')});

// ---for developing perposes

// require("./seed");

// ----

app.set('view engine', 'pug')
app.use(express.static("public"))
app.get("/", async (req, res, next)=>{
try{
    const products = await productModel.find()
    // let first = product[0];
    res.render("index", {products: products})
}

catch(err){
    connect.error(err.message);
    res.sendStatus(500);
}
});

app.get("/register", (req, res, next)=>{
    res.render("register");
})

app.listen(process.env.PORT, ()=>{console.log("server started!")});