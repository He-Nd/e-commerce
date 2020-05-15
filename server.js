require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());

app.get("/", async (req, res, next)=>{
try{
    const products = await Product.find()
    const userToken = req.cookies.tkn;

    let user;
    if (userToken){
        user = jwt.verify(userToken, process.env.SECRET);
    }
    
    // let first = product[0];
    res.render("index", {products, user})
}

catch(err){
    console.error(err.message);
    res.sendStatus(500);
}
});

app.get("/register",(req, res, next)=>{
    res.render("register");
})

app.post("/register",  async (req, res, next)=>{
        
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


app.get("/login", (req, res, next)=>{
    res.render("login",{status: req.query.status});
})

app.post("/login", async (req, res, next)=>{
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

app.get("/logout", (req, res, next)=>{
    res.clearCookie("tkn").redirect("/");
})

app.listen(process.env.PORT, ()=>{console.log("server started!")});