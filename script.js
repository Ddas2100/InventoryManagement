const myForm= document.querySelector('#my-form');
const msg= document.querySelector('.msg');
const userList= document.querySelector('#users');
 
const onSubmit= async(event) => {
    event.preventDefault();
    
    const itemName= event.target.item.value;
    const itemDescription= event.target.details.value;
    const itemPrice= event.target.price.value;
    const itemQuantity= event.target.quantity.value;

    const obj= {itemName , itemDescription , itemPrice, itemQuantity};
    
    try{
        if(obj.itemName === '' || obj.itemDescription === '' || obj.itemPrice === '' || obj.itemQuantity === '') {
            msg.classList.add('error');
            msg.innerHTML= 'Fill up all the boxes'; 
            setTimeout(() => msg.remove(), 3000);
        } else {
            const response= await axios.post("https://crudcrud.com/api/284f7afdab784f59882aec76818e7b89/StoreInventory", obj)
            showProductsOnScreen(response.data);
            console.log(response.data);

            event.target.item.value = '';
            event.target.details.value = '';
            event.target.price.value = '';
            event.target.quantity.value = '';
        }
    } catch(error) {
        console.log(error);
    }
}
myForm.addEventListener('submit', onSubmit);

function showProductsOnScreen(obj) {
    const li= document.createElement('li');
    var buy1Btn = document.createElement('button');
    buy1Btn.className= 'btn1';
    buy1Btn.appendChild(document.createTextNode('Buy 1'));

    buy1Btn.addEventListener('click', async () => {
        try {
            const response= await axios.delete(`https://crudcrud.com/api/284f7afdab784f59882aec76818e7b89/StoreInventory/${obj._id}`)
            localStorage.removeItem(obj);
            userList.removeChild(li);
            document.getElementById('item').value=obj.itemName;
            document.getElementById('details').value=obj.itemDescription;
            document.getElementById('price').value=obj.itemPrice;
            let total=obj.itemQuantity;
            if(total>=1) {
                document.getElementById('quantity').value=total-1;
            }
            else if(total<=0){
                msg.classList.add('error');
                msg.innerHTML= 'Product is out of stock';
                setTimeout(() => msg.remove(), 2000);
                document.getElementById('quantity').value=total;
            }
            console.log(response);
        }
        catch(error) {
            console.log(error);
        }
        
    })
    
    var buy2Btn = document.createElement('button');
    buy2Btn.className= 'btn2';
    buy2Btn.appendChild(document.createTextNode('Buy 2'));

    buy2Btn.addEventListener('click', async () => {
        try {
            const response= await axios.delete(`https://crudcrud.com/api/284f7afdab784f59882aec76818e7b89/StoreInventory/${obj._id}`)
            localStorage.removeItem(obj);
            userList.removeChild(li);
            document.getElementById('item').value=obj.itemName;
            document.getElementById('details').value=obj.itemDescription;
            document.getElementById('price').value=obj.itemPrice;
            let total=obj.itemQuantity;
            if(total>=2) {
                document.getElementById('quantity').value=total-2;
            }
            else if(total<=1){
                msg.classList.add('error');
                msg.innerHTML= 'Product is out of stock';
                setTimeout(() => msg.remove(), 2000);
                document.getElementById('quantity').value=total;
            }
            console.log(response);
        }
        catch(error) {
            console.log(error);
        }
        
    })

    var buy5Btn = document.createElement('button');
    buy5Btn.className= 'btn5';
    buy5Btn.appendChild(document.createTextNode('Buy 5'));

    buy5Btn.addEventListener('click', async () => {
        try {
            const response= await axios.delete(`https://crudcrud.com/api/284f7afdab784f59882aec76818e7b89/StoreInventory/${obj._id}`)
            localStorage.removeItem(obj);
            userList.removeChild(li);
            document.getElementById('item').value=obj.itemName;
            document.getElementById('details').value=obj.itemDescription;
            document.getElementById('price').value=obj.itemPrice;
            let total=obj.itemQuantity;
            if(total>=5) {
                document.getElementById('quantity').value=total-5;
            }
            else if(total<=4){
                msg.classList.add('error');
                msg.innerHTML= 'Product is out of stock';
                setTimeout(() => msg.remove(), 2000);
                document.getElementById('quantity').value=total;
            }
            console.log(response);
        }
        catch(error) {
            console.log(error);
        }
        
    })

    var del = document.createElement('button');
    del.className= 'delete';
    del.appendChild(document.createTextNode('Delete'));

    del.addEventListener('click', async () => {
        try{
            const response= await axios.delete (`https://crudcrud.com/api/284f7afdab784f59882aec76818e7b89/StoreInventory/${obj._id}`)
            localStorage.removeItem(obj);
            userList.removeChild(li);
            console.log(response);
        } catch(error) {
            console.log(error)
        }
    })

    li.appendChild(document.createTextNode(`Product Details: ${obj.itemName} , ${obj.itemDescription} , ${obj.itemPrice} , ${obj.itemQuantity}`));
    li.appendChild(buy1Btn);
    li.appendChild(buy2Btn);
    li.appendChild(buy5Btn);
    li.appendChild(del);
    userList.appendChild(li); 

    // localStorage.setItem(obj.itemName, JSON.stringify(obj));
    // console.log(JSON.parse(localStorage.getItem(obj.itemName)));
}

window.addEventListener("DOMContentLoaded", async() => {
    try {
        const response = await axios.get("https://crudcrud.com/api/284f7afdab784f59882aec76818e7b89/StoreInventory")
        console.log(response);

        for(var i=0; i<response.data.length; i++){
            showProductsOnScreen(response.data[i]);
        }
    } catch(error) {
        console.log(error);
    }
})