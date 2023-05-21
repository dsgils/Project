const s = (ol)=>document.querySelector(ol);
const a = (o)=>document.querySelectorAll(o);
let modalQt = 1;
let modalKey = 0;
let cart = [];

pizzaJson.map((item,index)=>{
    let pizzaItem = s('.models .pizza-item').cloneNode(true);

    s('.pizza-area').append(pizzaItem);

    pizzaItem.setAttribute('data-key',index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    // Evento de click //------------------------------------------------------------
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
            modalQt = 1;
                let key = e.target.closest('.pizza-item').getAttribute('data-key');
                modalKey = key;

            s('.pizzaWindowArea').style.opacity = "0";
                s('.pizzaWindowArea').style.display = "flex";
                    setTimeout(() => {
                        s('.pizzaWindowArea').style.opacity = "1";
                    }, 200);
        
        


        s('.pizzaBig img').src = pizzaJson[key].img;
        s('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        s('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        s('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        
        s('.pizzaInfo--size.selected').classList.remove('selected');

        a('.pizzaInfo--size').forEach((size,sizeIndex)=>{
            size.querySelector('span').innerHTML= pizzaJson[key].sizes[sizeIndex];
            if(sizeIndex == 2){
                size.classList.add('selected');}
        })

        s('.pizzaInfo--qt').innerHTML = modalQt;
        
    })
})

//Evento do Modal//-----------------------------------------------------------------------
function closeModal(){

    s('.pizzaWindowArea').style.opacity = "0";

        setTimeout(() => {
            s('.pizzaWindowArea').style.display="none";
                }, 500);
}

a('.pizzaInfo--cancelButton , .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal)
})

s('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    s('.pizzaInfo--qt').innerHTML = modalQt;
});

s('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        s('.pizzaInfo--qt').innerHTML = modalQt;
    }
   
})
a('.pizzaInfo--size').forEach((size,sizeIndex)=>{
    size.addEventListener('click',()=>{
        s('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
})

s('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = parseInt( s('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id +'@'+size;

    let key = cart.findIndex((item)=> item.identifier == identifier);

    if(key > -1){
        cart[key].qt += modalQt;
    }

    else{cart.push({
        identifier,
        id:pizzaJson[modalKey].id,
        size:size,
        qt:modalQt
    })}
    updateCart();
    closeModal();
})

function updateCart(){

   

    if(cart.length > 0){
        s('aside').classList.add('show');
        s('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;
    

        for(let i in cart){
            let = pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            let cartItem = s('.models .cart--item').cloneNode(true);

            subtotal += pizzaItem.price * cart[i].qt;

            let pizzaSizeName;

            switch(cart[i].size){

                case 0: 
                    pizzaSizeName = 'P'
                        break;
                case 1: 
                    pizzaSizeName = 'M'
                        break;
                case 2: 
                    pizzaSizeName = 'G'
                        break;

            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;



            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML= pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML= cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{

            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            })


            s('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        s('.subtotal span:last-child').innerHTML = `${subtotal.toFixed(2)}`;
        
    }
    else{

        s('aside').classList.remove('show');
    }
}