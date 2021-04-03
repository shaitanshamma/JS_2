const API_URL = 'database/database.json';
import {Goods} from "./public/goods.js";
import {Cart} from "./public/cart.js";
import {Search} from "./public/search.js";

const vue = new Vue({
        components: {
            Goods, Cart, Search
        },
        el: "#app-container",
        data() {
            return {
                goods: [],
                filtredGoods: [],
                cart: [],
                search_fld: '',
                basketNum: document.getElementById("basket__count"),
                isVisibleCart: false,
                isVisibleCatalog: true,
            }
        },
        methods: {

            logger(evt) {
                let log = {event: evt}
                fetch(`http://localhost:3000/log`, {
                    method: 'POST',
                    body: JSON.stringify(log),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((result) => {
                    console.log(result)
                })
            },

            searchHandler(str) {
                if (str === '') {
                    this.filtredGoods = this.goods;
                }
                const regexp = new RegExp(str, 'gim');
                this.filtredGoods = this.goods.filter((good) => good.title.match(regexp));
                this.logger('filter')
            },
            addToCart(good) {
                let isInCart = false
                if (this.cart.length === 0) {
                    this.cart.push(good)
                } else {
                    for (let i = 0; i < this.cart.length; i++) {
                        let key = this.cart[i].id
                        console.log(key, 'key')
                        console.log(this.cart[i].id, 'id')
                        if (key === good.id) {
                            good.quant += 1
                            console.log(good, 'good')
                            isInCart = true
                        }
                    }
                    if (!isInCart) {
                        this.cart.push(good);
                    }
                }
                this.basketNum.style.display = 'block';
                this.basketNum.textContent = `${this.cart.length}`;
                console.log(JSON.stringify(this.cart), 'string')

                fetch(`http://localhost:3000/cart`, {
                    method: 'POST',
                    body: JSON.stringify(good),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((result) => {
                    console.log(result)
                    this.logger('add to cart')
                })
            },


            showBasket() {
                this.isVisibleCart = true;
                this.isVisibleCatalog = false;
                console.log(this.isVisibleCart)
                this.logger('open cart')
                fetch(`http://localhost:3000/cart`, {
                    method: 'GET',
                    mode: 'no-cors'
                })
                    .then((res) => {
                        return res.text();
                    })
                    .then((data) => {
                            this.cart = JSON.parse(data)
                        }
                    )
            }
            ,
            continueShopping() {
                this.isVisibleCart = false;
                this.isVisibleCatalog = true;
                this.logger('open main page')
            }
            ,
            clearCart() {
                this.cart = []
                this.logger('clear cart')
            }
            ,
            remove(id) {
                this.cart = this.cart.filter(p => p.id !== id)
                fetch(`http://localhost:3000/cart/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => {
                        this.logger(`remove item from cart with id=${id}`)
                    })
            }
        },
        mounted() {
            fetch(`http://localhost:3000/catalog`, {
                method: 'GET',
                mode: 'no-cors'
            })
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                        this.goods = JSON.parse(data)
                        this.filtredGoods = this.goods
                    }
                );
            // ,
            fetch(`http://localhost:3000/cart`, {
                method: 'GET',
                mode: 'no-cors'
            })
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                        this.cart = JSON.parse(data)
                        this.basketNum.style.display = 'block';
                        this.basketNum.textContent = `${this.cart.length}`;
                    }
                )
        },
    })
;
//

//

const overlayMenuOpenButton = document.getElementById("open__overlay");

const overlayStyle = document.getElementById("overlay_menu");

const overlayMenuClose = document.getElementById("close__overlay");

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