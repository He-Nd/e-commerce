const addToCartButtons = document.querySelectorAll(".add-to-cart");

for (i = 0 ; i < addToCartButtons.length ; i++){

    addToCartButtons[i].addEventListener("click",async (e)=>{

        try{
       const result =  await axios.post(`/cart/${e.target.id}`);

       if (result.status===200){
           showModal('Success!',result.data.productName + " was added to your cart!");
           setTimeout(hideModal,2000);
       }
        }
       catch(err){
           console.log(err.message)
           showModal("something went wrong!", "Item was not added successfully");
           setTimeout(hideModal,2000);
       }
    })
}


function showModal(header,body){
    document.querySelector(".modal-header").textContent = header
    document.querySelector(".modal-body").innerHTML = `<p>${body}</p>`
    document.querySelector(".modal").style.display= 'block';
}

function hideModal(){
    document.querySelector(".modal").style.display= 'none';

;}