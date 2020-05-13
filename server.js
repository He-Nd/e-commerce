require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Product = require("./models/product");
const User = require("./models/user")



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
app.use(express.urlencoded({extended: false}))

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

app.get("/register",(req, res, next)=>{
    res.render("register");
})

app.post("/register",  async (req, res, next)=>{
    // console.log(req.body)
    
    const username = req.body.username
    const password = req.body.password
    const encryptPassword = await bcrypt.hash(password, 10)
    await new User({username, password: encryptPassword}).save();

    res.send("okie <3");
})

app.get("/login", (req, res, next)=>{
    res.render("login");
})

app.post("/login", (req, res, next)=>{
    res.send("okie <3");
})


app.listen(process.env.PORT, ()=>{console.log("server started!")});