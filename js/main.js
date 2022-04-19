const products = [
    {
        id: 1,
        name: "Apple",
        price: 12000,
        imgUrl: "img/ap.png"
    },
    {
        id: 2,
        name: "Nokia",
        price: 20000,
        imgUrl: "img/ap2.png"
    },
    {
        id: 3,
        name: "Apple 2",
        price: 10000,
        imgUrl: "img/ap3.png"
    },
    {
        id: 4,
        name: "Samsung",
        price: 5000,
        imgUrl: "img/ap.png"
    },
    {
        id: 4,
        name: "Samsung",
        price: 5000,
        imgUrl: "img/ap.png"
    }
]

const productsId = document.getElementById('products');
const ad = document.getElementById('ad');
const basketTotal = document.getElementById('total');
const searchBtn = document.getElementById('search__btn');


products.forEach(product => {
    productsId.innerHTML += `
            <div class="col-lg-3 mb-3">
                <div class="product">
                    <img src=${product.imgUrl} alt="#">
                    <h5>${product.name}</h5>
                    <h6>${product.price} сом</h6>
                    
                    <button class="product__basket-btn" data-id=${product.id} data-name=${product.name} data-price=${product.price}>Добавить в корзину</button>
                    
                    <button class="btn_delete_product_basket"
                            data-id=${product.id} 
                            data-name=${product.name} 
                            data-price=${+product.price}
                            style="color: white;
                                    background-color: green; 
                                    border-radius: 10px; 
                                    margin-top: 10px;">  Удалить из корзины  </button>
                </div
            </div>
`
})

const addBasketBtns = document.querySelectorAll('.product__basket-btn');
addBasketBtns.forEach(btn => btn.addEventListener('click', addToBasket))


const deleteProductBtn = document.querySelectorAll('.btn_delete_product_basket'); // Обращаемся к классу button
deleteProductBtn.forEach(btn => btn.addEventListener('click', deleteToBasket)); // Проходим по элементам с помощью forEach, и вешаем событие клик на кнопку, и обращаемся к функции deleteToBasket


// ************************   добавение рекамы

const hendleAd = {

    closeBtn: document.getElementById('closeBtn'),

    counter: document.getElementById('ad__counter-count'),

    hendleShow: function () {
        setTimeout(() => {
            ad.classList.add('active');
            hendleAd.interval();
        }, 1000)
    },

    interval: function () {
        let counter = 4;
        hendleAd.idInterval = setInterval(function () {
            counter -= 1;
            hendleAd.counter.textContent = counter;

            if (counter == 0) {
                clearInterval(hendleAd.idInterval);
                hendleAd.closeBtn.disabled = false;
            }

        }.bind(this), 1000)
    },

    hideAd: function () {
        ad.classList.remove('active');

    }
}

// **************************   добавение товара в корзину

let cart = {};

function showTotalSumm() {
    const totalSumm = JSON.parse(localStorage.getItem('totalSumm'));
    basketTotal.textContent = totalSumm
}

function setTotalSumm() {
    let totalSumm = 0;
    const cartLocalStorage = localStorage.getItem('cart')
    const cartPlace = JSON.parse(cartLocalStorage)

    for (let i in cartPlace) {
        totalSumm += cartPlace[i].productSumm
    }

    localStorage.setItem('totalSumm', totalSumm)

    showTotalSumm();

    console.log(totalSumm)
}

function setLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

function addToBasket(e) {
    e.preventDefault()
    const dataset = e.target.dataset
    const data = {
        id: dataset.id,
        name: dataset.name,
        price: +dataset.price
    }

    const cartLocalStorage = localStorage.getItem('cart');
    const cartObj = JSON.parse(cartLocalStorage);

    cart = { ...cartObj }

    if (cart[data.id]) {
        cart[data.id].count++,
            cart[data.id].productSumm = cart[data.id].count * data.price
    } else {
        cart[data.id] = {
            count: 1,
            name: data.name,
            price: +data.price,
            productSumm: +data.price
        }
    }
    setLocalStorage();
    setTotalSumm();
}



// Функция для удалении товара из корзины

function deleteToBasket(e) {
    e.preventDefault(); // preventDefault -> это метод для отмены стандартного действия браузера;
    const dataset = e.target.dataset
    const data = {
        id: dataset.id,
        name: dataset.name,
        price: +dataset.price
    }

    let cart = JSON.parse(localStorage.getItem('cart')); // JSON.parse() -> возвращаем новый объект

    if (cart[data.id]) {
        if (cart[data.id].count > 1) {
            cart[data.id].count--
            cart[data.id].productSumm = cart[data.id].count * data.price
        } else {
            delete cart[data.id]
        }
    }



    localStorage.setItem('cart', JSON.stringify(cart)); // преобразовали в строку JSON

    setTotalSumm();

}

// hendleAd.hendleShow(); // всплывающее окно рекламы

hendleAd.closeBtn.addEventListener('click', hendleAd.hideAd);


/*******************РЕГУЛЯРКА - НАЧАЛО****************/

const searchInput = document.getElementById('search__input');
const getText = document.querySelector('.container').textContent;

searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const inputValue = searchInput.value;

    if (inputValue === '') {
        document.querySelector('.resultText').innerHTML = getText
        return;
    }
    
    const regexp_1 = new RegExp(inputValue, 'gi');
    const regexp_2 = new RegExp(`\\b\\w*(${inputValue})\\w*\\b`, 'gi');

    const result = getText
        .replace(regexp_2, function (a) {
            return `<span>${a}</span>`
        })
        .replace(regexp_1, function (a) {
            return `<b>${a}</b>`
        });
    
    document.querySelector('.resultText').innerHTML = result;
})

/*******************РЕГУЛЯРКА - КОНЕЦ****************/











