const mongoose = require("mongoose");
const productModel = require("./models/product");

console.log("seed is running!");

mongoose.connection.dropCollection("products",(err)=>{
    if(err){
        console.error(err.message);
        return;
    }
    console.log("droped products collections!");

    productModel.insertMany(
        [
        {
            name: "London",
            price: 5,
            description: "a sketch for london city",
            img: "https://cdn.pixabay.com/photo/2015/12/08/00/55/london-1082180_960_720.jpg"
    
        },
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



