const row = document.getElementById('store-items');
const col = row.querySelectorAll('.col-10');
const input = document.getElementById('search-item');


// show cart

(function(){
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', function(){
        cart.classList.toggle('show-cart');
    });
})();

// add items to the cart

(function(){
    const cartBtn = document.querySelectorAll('.store-item-icon');
    cartBtn.forEach(function(btn){
        btn.addEventListener('click',function(event){
            // console.log(event.target);

            document.getElementById('cart-empty').style.display = "none";
            document.querySelector('.cart-total-container').classList.add('d-flex');
            document.querySelector('.cart-buttons-container').classList.add('d-flex');

            if(event.target.parentElement.classList.contains('store-item-icon')){
                let fullPath = event.target.parentElement.previousElementSibling.src;
                let pos = fullPath.indexOf('img')+3;
                let partialPath = fullPath.slice(pos)

                const item = {};
                item.img = `img-cart${partialPath}`;
                let name = 
                    event.target.parentElement.parentElement.nextElementSibling.
                    children[0].children[0].textContent;
                item.name = name;
                let price = 
                    event.target.parentElement.parentElement.nextElementSibling.
                    children[0].children[1].textContent;

                let finalPrice = price.slice(1).trim();
                item.price = finalPrice;


                const cartItem = document.createElement('div');
                      cartItem.classList.add(
                          'cart-item', 
                          'd-flex', 
                          'justify-content-between',
                          'text-capitalize',
                          "my-3"
                        );

                cartItem.innerHTML = `
                        <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                        <div class="item-text">
                    
                            <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                            <span>$</span>
                            <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                        </div>
                        <a id='cart-item-remove' class="cart-item-remove">
                            <i class="fas fa-trash"></i>
                        </a>
                    </div>`;

                // select cart
                    const cart = document.getElementById('cart');
                    const total = document.querySelector('.cart-total-container');

                    cart.insertBefore(cartItem, total);
                    alert('item added to the cart!')

                    showTotals();
            }
        });
    });

    // show totals
    function showTotals(){
        const total = [];
        const items = document.querySelectorAll('.cart-item-price');

        items.forEach(function(item){
            total.push(parseFloat(item.textContent));
        });

        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;
        },0);

        const finalMoney = totalMoney.toFixed(2);

        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney; 
        document.getElementById('item-count').textContent = total.length; 
    }
})();

// delete an item from cart
function deleteFromCart(){
    // Code here
}

function clearCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    document.querySelector('.cart-total-container').classList.remove('d-flex');
    document.querySelector('.cart-buttons-container').classList.remove('d-flex');
    document.getElementById('cart-total').textContent = "0";
    document.querySelector('.item-total').textContent = "0"; 
    document.getElementById('item-count').textContent = "0";
    var i;
    document.getElementById('cart-empty').style.display = "block";
    for (i = 0; i < cartItems.length; i++) {
        cartItems[i].innerHTML = '';
        cartItems[i].classList.remove('d-flex')
        cartItems[i].style.display = "none";
    }
}

function search() {
    var i;
    const filter = input.value.toLowerCase();

    for(i = 0; i < col.length; i++){
        const card = col[i].querySelector('.card .card-body .card-text');
        const item = card.getElementsByTagName("h5")[0];
        
        let itemValue = item.textContent || item.innerText;


        if(itemValue.toLowerCase().indexOf(filter) > -1) {
            col[i].style.display = "";
        }
        else {
            col[i].style.display = "none";
        }
        
    }
}

function sort(filter) {
    input.value = "";
    var i, value;
    for(i = 0; i < col.length; i++){
        value = col[i].getAttribute('data-item');
        if(value === filter || filter === "all") {
            col[i].style.display = "";
        }
        else {
            col[i].style.display = "none";
        }
    }
}