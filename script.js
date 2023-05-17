const s = (ol)=>document.querySelector(ol);
const a = (o)=>document.querySelectorAll(o);
let modalQt = 1;

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