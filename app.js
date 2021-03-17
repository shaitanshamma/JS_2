const overlayMenuOpenButton = document.getElementById("open__overlay");

const overlayStyle = document.getElementById("overlay_menu");

const overlayMenuClose = document.getElementById("close__overlay");

const basketNum = document.getElementById("basket__count");

const cartHtml = document.querySelector('.cart_items');

const totalPrice = document.querySelector('.total_price span')

let basketCount;

let cart = [];

// let catalog = [];
//
// let dataBase = [];

const mainCatalogHtml = document.querySelector('.feature_content.main');

const catalogHtml = document.querySelector('.feature_content.catalog');

class Product {
    constructor(id, title, brand = 'noname', price, imgSrc, popular = false, quant = 1) {
        this.id = id;
        this.title = title;
        this.brand = brand;
        this.price = price;
        this.imgSrc = imgSrc;
        this.popular = popular;
        this.quant = quant
    }
}

class ProductService {
    constructor() {
    }

    makeGETRequest() {
        let url = 'database/database.json'
        return new Promise(function (resolve, reject) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else if (xhr.status > 400) {
                        reject(new Error("полундра"))
                    }
                }
            }
            xhr.open('GET', url, true);
            xhr.send();
        })
    }


    makeGPutRequest(product) {
        let cart = 'database/cart.json'

        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open('POST', cart, true);
        xhr.send(product);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('ok')
                } else if (xhr.status > 400) {
                    new Error("полундра")
                }
            }
        }
    }
}

class DrawHtmlItems {
    constructor() {
        this.array = []
    }

    drawItem() {
    }
}

class MainCatalog extends DrawHtmlItems {

    constructor() {
        super();
        this.productService = new ProductService()
        this.pr = this.productService.makeGETRequest()
        this.productService.makeGPutRequest.bind(this)
        const promise = this.productService.makeGETRequest()
        promise.then(result => this.drawMain(result),
            err => this.errorFunc(err))
    }

    errorFunc(e) {
        mainCatalogHtml.insertAdjacentHTML("afterbegin", `
        <h1>ПОЛУНДРА! ${e}</h1>
        `)
    }

    drawMain(data) {
        this.array = data.map(({id, title, brand, price, imgSrc, popular}) => new Product(id, title, brand, price, imgSrc, popular))
        if (mainCatalogHtml != null) {
            this.array.reverse().filter(prod => prod.popular).forEach(prd => this.drawItem(prd))
            this.addToCartListner(this.array.reverse())
        }
        console.log(this.array, 'from promise')
    }

    drawItem(product) {
        mainCatalogHtml.insertAdjacentHTML("afterbegin", `        
        <div class="fature_item" id="product_${product.id}">
            <div class="overlay">
                <a href="cart.html">
                </a>
                    <button class="add_to_card_block" id="add_to_cart_${product.id}" type="button">
                        <img src="img/cart.png" alt="">
                        <p>Add to Cart</p>
                    </button>
            </div>
            <a href="product.html">
                <img src=${product.imgSrc} alt="" class="feature_img">
                <h3>${product.title}</h3>
                <p class="pgf">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym
                    Ellery teams up with Moda Operandi.</p>
                <p class="price">$${product.price}</p>
            </a>
        </div>`)
    }

    addToCartListner(db) {
        const basket = new Cart()
            mainCatalogHtml.addEventListener('click', function (e) {
                    db.forEach(prod => `add_to_cart_${prod.id}` === e.target.id ? basket.addToBasket(prod) : new Error('не могу добавить продукт'))
                    // arr.forEach(prod => `add_to_cart_${prod.id}` === e.target.id ? localStorage.setItem(`${prod.id}`,`${JSON.stringify(prod)}`) : new Error('не могу добавить продукт'))
                    // arr.forEach(prod => `add_to_cart_${prod.id}` === e.target.id ? basket.addToBasket(prod) : new Error('не могу добавить продукт'))
                    // arr.forEach(prod => `add_to_cart_${prod.id}` === e.target.id ? cart.push(prod) : new Error('не могу добавить продукт'))
                }
            )
    }
}

class Catalog extends DrawHtmlItems {

    constructor() {
        super();
        this.productService = new ProductService()
        const pr = this.productService.makeGETRequest()
        pr.then(result => this.drawMain(result),
            error => this.errorFunc(error))
    }

    errorFunc(e) {
        catalogHtml.insertAdjacentHTML("afterbegin", `
      <h1>ПОЛУНДРА! ${e}</h1>`)
    }

    drawItem(product) {
        catalogHtml.insertAdjacentHTML("afterbegin", `
        <div class="fature_item" id="product_${product.id}">
            <div class="overlay">
                <a href="cart.html">
                </a>
                    <button class="add_to_card_block" id="add_to_cart_${product.id}" type="button">
                        <img src="img/cart.png" alt="">
                        <p>Add to Cart</p>
                    </button>
            </div>
            <a href="product.html">
                <img src=${product.imgSrc} alt="" class="feature_img">
                <h3>${product.title}</h3>
                <p class="pgf">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym
                    Ellery teams up with Moda Operandi.</p>
                <p class="price">$${product.price}</p>
            </a>
        </div>`)
    }

    drawMain(data) {
        this.array = data.map(({id, title, brand, price, imgSrc, popular}) => new Product(id, title, brand, price, imgSrc, popular))
        if (catalogHtml != null) {
            this.array.reverse().forEach(prd => this.drawItem(prd))
        }
    }
}

class Cart {
    constructor() {
        this.list = []
        this.clearCart = document.querySelector('.cart_button.clear')
        this.form = document.querySelector('#submit_form')
        // this.nameInput = this.form.querySelector('#name')
        // this.emailInput = this.form.querySelector('#email')
        // this.phoneInput = this.form.querySelector('#phone')
        // this.nameInput.addEventListener('input', (e) => this.nameValid(e))
        // this.emailInput.addEventListener('input', (e) => this.emailValid(e))
        // this.phoneInput.addEventListener('input', (e) => this.phoneValid(e))
        // this.form.addEventListener('submit', (e) => this.formValid(e))
        // this.nV = false
        // this.pV = false
        // this.eV = false
    }

    addToBasket(prod) {
        let isInCart = false
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            if (key === `${prod.id - 1}`) {
                let product = JSON.parse(localStorage.getItem(key))
                product.quant += 1
                console.log(product)
                localStorage.removeItem(key)
                localStorage.setItem(`${product.id - 1}`, `${JSON.stringify(product)}`)
                isInCart = true
            }
        }
        if (!isInCart) {
            localStorage.setItem(`${prod.id - 1}`, `${JSON.stringify(prod)}`)
        }
        basketNum.style.display = 'block';
        basketNum.textContent = `${localStorage.length}`;
    }

    addToListBasket() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            let product = JSON.parse(localStorage.getItem(key))
            console.log(product, 'prod in storage')
            this.list.push(product)
            // this.drawItem(product)
        }
    }

    draw() {
        this.list.forEach(p => this.drawItem(p))
    }

    drawItem(item) {
        if (cartHtml != null) {
            // for (const product of cart) {
            cartHtml.insertAdjacentHTML('beforeend', `<div class="product_in_cart" id='prd_in_cart_${item.id}'>
                        <img src='${item.imgSrc}' alt="" class="product_img">
                        <div class="description">
                            <h3>MANGO PEOPLE T-SHIRT</h3>
                            <p class="product_decr">Price: <span>${item.price}</span></p>
                            <p class="product_decr">Color: Red</p>
                            <p class="product_decr">Size: Xl</p>
                            <label>
                                <span class="product_decr">Quantity:</span>
                                <input type="number" class="input_number" value="${item.quant}">
                            </label>
                            <a href="#" class="close_prd" >
                                <i class="far fa-window-close product-close"></i>
                            </a>
                        </div>
                    </div>`)
        }
    }

    clear() {
        this.list = []
        localStorage.clear()
        this.addToListBasket()
        this.draw()
        console.log("done")
    }
}


let prd_1 = new Product(1, 'ELLERY X M\'O CAPSULE', undefined, 52, 'img/catalog/feature_1.png', true)
let prd_2 = new Product(2, 'ELLERY X M\'O CAPSULE', undefined, 54, 'img/catalog/feature_2.png')
let prd_3 = new Product(3, 'ELLERY X M\'O CAPSULE', undefined, 58, 'img/catalog/feature_3.png')
let prd_4 = new Product(4, 'ELLERY X M\'O CAPSULE', undefined, 60, 'img/catalog/feature_4.png', true)
let prd_5 = new Product(5, 'ELLERY X M\'O CAPSULE', undefined, 123, 'img/catalog/feature_5.png')
let prd_6 = new Product(6, 'ELLERY X M\'O CAPSULE', undefined, 152, 'img/catalog/feature_6.png', true)
let prd_7 = new Product(7, 'ELLERY X M\'O CAPSULE', undefined, 55, 'img/catalog/feature_7.png')
let prd_8 = new Product(8, 'ELLERY X M\'O CAPSULE', undefined, 569, 'img/catalog/feature_8.png', true)
let prd_9 = new Product(9, 'ELLERY X M\'O CAPSULE', undefined, 48, 'img/catalog/feature_9.png')
let prd_10 = new Product(10, 'ELLERY X M\'O CAPSULE', undefined, 45, 'img/catalog/feature_10.png', true)
let prd_11 = new Product(11, 'ELLERY X M\'O CAPSULE', undefined, 66, 'img/catalog/feature_11.png')
let prd_12 = new Product(12, 'ELLERY X M\'O CAPSULE', undefined, 50, 'img/catalog/feature_12.png', true)

const catalogs = new Catalog()

const mainCatalog = new MainCatalog()

if (cartHtml != null) {
    const cart2 = new Cart()
    cart2.addToListBasket()
    cart2.draw()
    clearCart = document.querySelector('.cart_button.clear')
    clearCart.addEventListener('click',e=>this.clear(e))
    const form = document.querySelector('#submit_form')
    nameInput = form.querySelector('#name')
    emailInput = form.querySelector('#email')
    phoneInput = form.querySelector('#phone')
    nameInput.addEventListener('input', (e) => nameValid(e))
    emailInput.addEventListener('input', (e) => emailValid(e))
    phoneInput.addEventListener('input', (e) => phoneValid(e))
    form.addEventListener('submit', (e) => formValid(e))
    nV = false
    pV = false
    eV = false
}

function nameValid(e) {
    const regName = /^[а-яА-ЯёЁa-zA-Z]+$/gi
    if (!regName.test(e.target.value)) {
        e.target.style.border = '2px solid red'
    } else {
        console.log("все путем")
        e.target.style.border = '1px solid black'
        this.nV = true
    }
}

function emailValid(e) {
    const regEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/gi
    if (!regEmail.test(e.target.value)||e.target.value==='') {
        e.target.style.border = '2px solid red'
    } else {
        console.log("все путем")
        e.target.style.border = '1px solid black'
        this.eV = true
    }
}

function phoneValid(e) {
    const regPhone = /^\+7\([0-9]{3}\)([0-9]{3})+-+([0-9]{4})+$/gi
    if (!regPhone.test(e.target.value)) {
        e.target.style.border = '2px solid red'
    } else {
        console.log("все путем")
        e.target.style.border = '1px solid black'
        this.pV = true
    }
}


function formValid(e) {
    const form = document.querySelector('#submit_form')
    let field = form.querySelectorAll('input')
    for (let i = 0; i <field.length ; i++) {
        if(field[i].value===''|| this.pV===false || this.eV===false || this.nV===false){
            e.preventDefault()
            console.log('form aborted')
        }else {
            localStorage.clear()
        }
    }
}

function clear() {
    cartHtml.textContent = ''
    localStorage.clear()
    basketCount = localStorage.length;
    basketNum.style.display='none';
}

window.onload = () => {
    if (localStorage.length===0) {
        console.log(localStorage.length)
        basketCount = localStorage.length;
        basketNum.style.display='none';
    } else {
        basketNum.style.display='block';
        basketNum.textContent = `${localStorage.length}`;
    }
}

overlayMenuOpenButton.onclick = () => {
    if (overlayStyle.style.display === "none") {
        document.body.style.overflow = 'hidden'
        document.getElementById("overlay_menu").style.opacity = "1";
        document.getElementById("overlay_menu").style.display = "flex";
    } else {
        document.body.style.overflow = null
        document.getElementById("overlay_menu").style.opacity = "0";
        document.getElementById("overlay_menu").style.display = "none";
    }
};
overlayMenuClose.onclick = () => {
    document.body.style.overflow = null
    document.getElementById("overlay_menu").style.display = "none";
    document.getElementById("overlay_menu").style.opacity = "0";
};

