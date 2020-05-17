require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Product = require("./models/product");
const User = require("./models/user");
const {checkUser, isLoggedInRedirect, isLoggedOutRedirect, renderRoot, addToCart} = require("./middleware");



mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);


mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(()=>{console.log('Connected to MongoDB!');
// ---for developing perposes

// require("./seed");

// ----

})
.catch(()=>{console.error('MongoDB connection error!')
});


app.set('view engine', 'pug')
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());




app.use(checkUser);

app.get("/", async (req, res, next) => {
    try {
      const products = await Product.find();
  
      return res.render("index", { products, user: req.user });
    }
     catch (err) {
      console.error(err.message);
      res.sendStatus(500);
    }
  });


app.get("/register",isLoggedInRedirect,(req, res, next)=>{
    res.render("register");
})

app.post("/register",isLoggedInRedirect, async (req, res, next)=>{
        
    const username = req.body.username
    const password = req.body.password

    if (!username || !password){
        
        res.render("register",{status:"fail", message:"You are mising information!"});
        return;
    }


    try{

        const existingUser = await User.findOne({username}) 

        if(existingUser){

            res.render("register",{status:"fail", message:"This name already exists!"});
            return;
        }

        const encryptPassword = await bcrypt.hash(password, 10);
        await new User({username, password: encryptPassword}).save();
        res.render("register",{status:"success", message:"You have been rigistered successfully!"});
    }

    catch(err){
        console.error(err.message);
        res.render("register",{status:"fail", message:"something went wrong!"});
    }


});


app.get("/login",isLoggedInRedirect, (req, res, next)=>{
    res.render("login",{status: req.query.status});
})

app.post("/login", isLoggedInRedirect, async (req, res, next)=>{
    const username = req.body.username
    const password = req.body.password

    if (!username || !password){
        
        res.render("login",{status:"fail", message:"You are mising information!"});
        return;
    }

    try{
        const existingUser = await User.findOne({username})
        if(existingUser && await bcrypt.compare(password, existingUser.password)){
            const token = jwt.sign({username: existingUser.username}, process.env.SECRET);
            res.cookie("tkn", token).redirect("/");
            return;
        }
        res.render("login",{status:"fail", message:"wrong information!"});

        }

        catch(err){
            console.error(err.message);
            res.render("login",{status:"fail", message:"server error!"});
        }
        
    })

app.get("/logout",isLoggedOutRedirect, (req, res, next)=>{
    res.clearCookie("tkn").redirect("/");
})

app.post("/cart/:productId", isLoggedOutRedirect,async (req, res, next) => {
  try {
    const userDocument = await User.findOne({ username: req.user.username });

    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (product) {
      userDocument.cart.push(productId);
      await userDocument.save();
      res.status(200).send({productName:product.name})
    } else {
        return res.sendStatus(404);
      
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT, ()=>{console.log("server started!")});