const overlayMenuOpenButton = document.getElementById("open__overlay");

const overlayStyle = document.getElementById("overlay_menu");

const overlayMenuClose = document.getElementById("close__overlay");

const basketNum = document.getElementById("basket__count");

const cartHtml = document.querySelector('.cart_items');

const totalPrice = document.querySelector('.total_price span')

let basketCount;

let cart = [];

let catalog = [];

const dataBase = [];

const mainCatalogHtml = document.querySelector('.feature_content.main');

const catalogHtml = document.querySelector('.feature_content.catalog');

class Product {
    constructor(id, title, brand = 'noname', price, imgSrc, popular = false) {
        this.id = id;
        this.title = title;
        this.brand = brand;
        this.price = price;
        this.imgSrc = imgSrc;
        this.popular = popular;
    }
}

class ProductService {
    constructor() {
    }

    selectAllProducts(dataBase) {
        return dataBase
    }

    selectPopularProducts(dataBase) {
        return dataBase.filter(product => product.popular)
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

    drawCatalog() {
        this.array = this.productService.selectPopularProducts(dataBase)
        if (mainCatalogHtml !== null) {
            this.array.reverse().forEach(product => this.drawItem(product))
        }
    }
}

class Catalog extends DrawHtmlItems {

    constructor() {
        super();
        this.productService = new ProductService()
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
        this.array = this.productService.selectAllProducts(dataBase)
        if (catalogHtml !== null) {
            this.array.reverse().forEach(product => this.drawItem(product))
        }
    }
}

class Cart {
    constructor() {
        this.list = []
    }

    addToCart(item) {
        this.list.push(item)
        this.drawCart()
    }
    //---------------------------Заглушка --------------------------------
    // drawCart(item) {
    //     const productService = new ProductService()
    //     const catalog = productService.selectAllProducts(dataBase)
    //     let isInCart = false
    //     for (const prod of catalog) {
    //         if (item.target.id === `add_to_cart_${prod.id}`) {
    //             for (let i = 0; i < this.list.length; i++) {
    //                 if (this.list[i].id === prod.id) {
    //                     this.list[i].quantity += 1
    //                     isInCart = true
    //                 }
    //             }
    //             if (!isInCart) {
    //                 prod.quantity = 1
    //                 this.list.push(prod)
    //             }
    //         }
    //     }
    //     basketNum.style.display = 'block';
    //     basketNum.textContent = `${cart.length}`;
    //      basketNum.textContent = `${this.list.length}`;
    // }
    drawCart(item) {
        let isInCart = false
        for (const prod of catalog) {
            if (item.target.id === `add_to_cart_${prod.id}`) {
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].id === prod.id) {
                        cart[i].quantity += 1
                        isInCart = true
                    }
                }
                if (!isInCart) {
                    prod.quantity = 1
                    cart.push(prod)
                }
            }
        }
        basketNum.style.display = 'block';
        basketNum.textContent = `${cart.length}`;
        console.log(cart);
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

dataBase.push(prd_1, prd_2, prd_3, prd_4, prd_5, prd_6, prd_7, prd_8, prd_9, prd_10, prd_11, prd_12)
catalog.push(prd_1, prd_2, prd_3, prd_4, prd_5, prd_6, prd_7, prd_8, prd_9, prd_10, prd_11, prd_12)

catalogs.drawCatalog()

mainCatalog.drawCatalog()

window.onload = () => {
    if (document.querySelector(".cart_items") !== null) {
        basketCount = cart.length;
        basketNum.textContent = `${basketCount}`;
    } else {
        basketNum.style.display = 'none';
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

function removeItem(id) {
    document.getElementById(id).remove();
    if (document.querySelector(".cart_items").children.length !== 0) {
        basketCount--;
        basketNum.textContent = `${basketCount}`;
    } else {
        document.querySelector(".products_in_cart").remove();
        basketNum.textContent = `0`;
    }
}

if (mainCatalogHtml != null) {
    mainCatalogHtml.addEventListener('click', cart2.drawCart)
}

/*Пока заглушка, т.к. еще не умею передавать данные между станицами*/
if (cartHtml != null) {
    // for (const product of cart) {
    cartHtml.insertAdjacentHTML('beforeend', `<div class="product_in_cart" id='prd_in_cart_${dataBase[3].id}'>
                        <img src='${dataBase[3].imgSrc}' alt="" class="product_img">
                        <div class="description">
                            <h3>MANGO PEOPLE T-SHIRT</h3>
                            <p class="product_decr">Price: <span>${dataBase[3].price}</span></p>
                            <p class="product_decr">Color: Red</p>
                            <p class="product_decr">Size: Xl</p>
                            <label>
                                <span class="product_decr">Quantity:</span>
                                <input type="number" class="input_number" value="${dataBase[3].quantity}">
                            </label>
                            <a href="#" class="close_prd" >
                                <i class="far fa-window-close product-close"></i>
                            </a>
                        </div>
                    </div>`)
    cartHtml.insertAdjacentHTML('beforeend', `<div class="product_in_cart" id='prd_in_cart_${dataBase[5].id}'>
                        <img src='${dataBase[5].imgSrc}' alt="" class="product_img">
                        <div class="description">
                            <h3>MANGO PEOPLE T-SHIRT</h3>
                            <p class="product_decr">Price: <span>${dataBase[5].price}</span></p>
                            <p class="product_decr">Color: Red</p>
                            <p class="product_decr">Size: Xl</p>
                            <label>
                                <span class="product_decr">Quantity:</span>
                                <input type="number" class="input_number" value="${dataBase[5].quantity}">
                            </label>
                            <a href="#" class="close_prd" >
                                <i class="far fa-window-close product-close"></i>
                            </a>
                        </div>
                    </div>`)
    cartHtml.insertAdjacentHTML('beforeend', `<div class="product_in_cart" id='prd_in_cart_${dataBase[7].id}'>
                        <img src='${dataBase[7].imgSrc}' alt="" class="product_img">
                        <div class="description">
                            <h3>MANGO PEOPLE T-SHIRT</h3>
                            <p class="product_decr">Price: <span>${dataBase[7].price}</span></p>
                            <p class="product_decr">Color: Red</p>
                            <p class="product_decr">Size: Xl</p>
                            <label>
                                <span class="product_decr">Quantity:</span>
                                <input type="number" class="input_number" value="${dataBase[7].quantity}">
                            </label>
                            <div class="close_prd" id="rmv_${dataBase[7].id}">
                                <i class="far fa-window-close product-close"></i>
                            </div>
                        </div>
                    </div>`)
    // }

    cartHtml.addEventListener('click', function (e) {
        if (e.target.id === `rmv_${catalog[1].id}`) {

        }
    })
    totalPrice.textContent = `${dataBase[7].price}`
}




