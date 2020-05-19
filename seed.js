const mongoose = require('mongoose');
const productModel = require("./models/product");


console.log('seeding database');

mongoose.connection.dropCollection('users',(err)=>{

  if (err){
    console.error(err.message);
    console.log('^^^ users collection couldnt be dropped')
  }
  else{
    console.log('users collection was dropped');
  }

});

mongoose.connection.dropCollection('products',(err)=>{

    if (err){
        console.error(err.message);
        console.log("^^^ products collection couldn't be dropped")
    }
    else{
      console.log('products collection was dropped!')
    }

    productModel.insertMany(
        [
          {
            name: "London",
            price: 5,
            description: "a sketch for london city",
            img: "https://cdn.pixabay.com/photo/2015/12/08/00/55/london-1082180_960_720.jpg",
          },
          {
            name: "Elephent",
            price: 5,
            description: "a colorful drawing for elephent animal",
            img: "https://cdn.pixabay.com/photo/2020/05/07/20/48/elephant-5143133_960_720.png",
          },
          {
            name: "Summer",
            price: 15,
            description: "Full summer vibes!",
            img: "https://cdn.pixabay.com/photo/2020/05/15/19/47/summer-5174935_960_720.png",
          },
          {
            name: "White rose",
            price: 10,
            description: "A perfect rose shot!",
            img: "https://cdn.pixabay.com/photo/2020/05/16/06/50/rose-5176244__340.png",
          },
          {
            name: "Shadows",
            price: 10,
            description: "Black sketch of nature.",
            img: "https://cdn.pixabay.com/photo/2020/05/07/20/46/forest-5143125__340.png",
          },
          {
            name: "Bird",
            price: 20,
            description: "Black sketch of a bird.",
            img: "https://cdn.pixabay.com/photo/2020/05/12/04/18/crow-5161177__340.png",
          },
        ],
        (err) => {
            if (err){
                console.error(err.message);
                return;
            }

            console.log('done inserting products!')
        }
      );

})



