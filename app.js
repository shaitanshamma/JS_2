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

// class ProductRep {
//     constructor() {
//         this.url='database/database.json'
//     }
//
//     makeGETRequest(error, success) {
//         let xhr;
//
//         if (window.XMLHttpRequest) {
//             xhr = new XMLHttpRequest();
//         } else if (window.ActiveXObject) {
//             xhr = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4) {
//                 if(xhr.status ===200){
//                     success(JSON.parse(xhr.responseText));
//                 }else if(xhr.status > 400){
//                     error()
//                 }
//             }
//         }
//
//         xhr.open('GET', this.url, true);
//         xhr.send();
//     }
// }

class ProductService {
    constructor() {
        // this.url = 'database/database.json'
        // // this.prdrep = new ProductRep()
        // // this.prdrep.makeGETRequest(this.error.bind(this),this.dbCreate.bind(this) )
        this.localDb = []
    }

    // error() {
    //
    // }

    // makeGETRequest(error, success) {
    //     let xhr;
    //
    //     if (window.XMLHttpRequest) {
    //         xhr = new XMLHttpRequest();
    //     } else if (window.ActiveXObject) {
    //         xhr = new ActiveXObject("Microsoft.XMLHTTP");
    //     }
    //
    //     xhr.open('GET', this.url, true);
    //     xhr.send();
    //
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState === 4) {
    //             if (xhr.status === 200) {
    //                 success(JSON.parse(xhr.responseText));
    //             } else if (xhr.status > 400) {
    //                 error()
    //             }
    //         }
    //     }
    // }
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

    addToList(...item) {
        this.array.push(...item)
    }

}

class MainCatalog extends DrawHtmlItems {

    constructor() {
        super();
        this.productService = new ProductService()
        this.pr = this.productService.makeGETRequest()
        this.array = []
        this.productService.makeGPutRequest.bind(this)
        this.basket = new Cart()
    }

    errorFunc() {
        mainCatalogHtml.insertAdjacentHTML("afterbegin", `
        <h1>ПОЛУНДРА!</h1>
        `)
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

    async drawCatalog() {
        let arr = []
        await this.pr.then(result => arr = result.map(({id, title, brand, price, imgSrc, popular}) => new Product(id, title, brand, price, imgSrc, popular))
            , error => this.errorFunc(error))
        if (mainCatalogHtml != null) {
            arr.reverse().filter(prod => prod.popular).forEach(prd => this.drawItem(prd))
        }
    }

    async addToCartListner() {
        let arr = []
        let basket = new Cart()
        await this.pr.then(result => arr = result.map(({id, title, brand, price, imgSrc, popular, quant}) => new Product(id, title, brand, price, imgSrc, popular, quant)),
            error => this.errorFunc(error))
        if (mainCatalogHtml != null) {
            mainCatalogHtml.addEventListener('click', function (e) {
                    arr.forEach(prod => `add_to_cart_${prod.id}` === e.target.id ? basket.addToBasket(prod) : new Error('не могу добавить продукт'))
                    // arr.forEach(prod => `add_to_cart_${prod.id}` === e.target.id ? localStorage.setItem(`${prod.id}`,`${JSON.stringify(prod)}`) : new Error('не могу добавить продукт'))
                    // arr.forEach(prod => `add_to_cart_${prod.id}` === e.target.id ? basket.addToBasket(prod) : new Error('не могу добавить продукт'))
                    // arr.forEach(prod => `add_to_cart_${prod.id}` === e.target.id ? cart.push(prod) : new Error('не могу добавить продукт'))
                }
            )
            // console.log(cart)
            console.log(localStorage)
            console.log("clicl")
        }
    }
}

class Catalog extends DrawHtmlItems {

    constructor() {
        super();
        this.productService = new ProductService()
        this.productService = new ProductService()
        this.pr = this.productService.makeGETRequest()
    }

    errorFunc() {
        catalogHtml.insertAdjacentHTML("afterbegin", `
      <h1>ПОЛУНДРА!</h1>`)
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

    drawCatalog() {
        if (catalogHtml !== null) {
            this.pr.then(result => result.reverse().forEach(product => this.drawItem(product)),
                error => this.errorFunc(error))
        }
    }
}

class Cart {
    constructor() {
        this.list = []
    }

    addToBasket(prod) {
        let isInCart = false
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            if (key === `${prod.id -1}`) {
                let product = JSON.parse(localStorage.getItem(key))
                product.quant += 1
                console.log(product)
                localStorage.removeItem(key)
                localStorage.setItem(`${product.id - 1}`, `${JSON.stringify(product)}`)
                isInCart = true
            }
        }
        if (!isInCart) {
            localStorage.setItem(`${prod.id -1}`, `${JSON.stringify(prod)}`)
        }
        basketNum.style.display = 'block';
        basketNum.textContent = `${localStorage.length}`;
    }
    addToListBasket(){
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            let product = JSON.parse(localStorage.getItem(key))
            console.log(product, 'prod in storage')
            this.list.push(product)
        }
    }
    draw(){
        this.list.forEach(p => this.drawItem(p) )
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
const cart2 = new Cart()
// localStorage.clear()
// dataBase.push(prd_1, prd_2, prd_3, prd_4, prd_5, prd_6, prd_7, prd_8, prd_9, prd_10, prd_11, prd_12)
// catalog.push(prd_1, prd_2, prd_3, prd_4, prd_5, prd_6, prd_7, prd_8, prd_9, prd_10, prd_11, prd_12)

catalogs.drawCatalog()

mainCatalog.drawCatalog()
mainCatalog.addToCartListner()
cart2.addToListBasket()
cart2.draw()

window.onload = () => {
    if (document.querySelector(".cart_items") !== null) {
        basketCount = cart.length;
        basketNum.textContent = `${basketCount}`;
    } else {
        basketNum.style.display = 'none';
    }
}
window.onload = () => {
    basketNum.style.display = 'block';
    basketNum.textContent = `${localStorage.length}`;
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

// function removeItem(id) {
//     document.getElementById(id).remove();
//     if (document.querySelector(".cart_items").children.length !== 0) {
//         basketCount--;
//         basketNum.textContent = `${basketCount}`;
//     } else {
//         document.querySelector(".products_in_cart").remove();
//         basketNum.textContent = `0`;
//     }
// }

