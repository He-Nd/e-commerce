const mongoose = require("mongoose");
const productModel = require("./models/product");

console.log("seed is running!");

mongoose.connection.dropCollection("users", (err)=>{
    if (errpr){
        console.error(error.message)
        console.log("^^^users collection couldn't be dropped")
    }
    else{
        console.log("users dropped")
    }

})
mongoose.connection.dropCollection("products",(err)=>{
    if(err){
        console.error(err.message);
        console.log("^^products collection couldn't be dropped")
    }
    else{
        console.log("droped products collections!");
        
    }
    

    productModel.insertMany(
        [
        {
            name: "London",
            price: 5,
            description: "a sketch for london city",
            img: "https://cdn.pixabay.com/photo/2015/12/08/00/55/london-1082180_960_720.jpg"
    
        },
        {
            name: "Elephent",
            price: 5,
            description: "a colorful drawing for elephent animal",
            img: "https://cdn.pixabay.com/photo/2020/05/07/20/48/elephant-5143133_960_720.png"

        }
    ],
        (err) => {
            if(err){
                console.error(err.message);
                return;
            }
            console.log("done inserting products!");
         }
    
    );
});



