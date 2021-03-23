const API_URL = 'database/database.json';

Vue.component('goods-list', {
    props: ['goods'],
    template: `
    <div class="goods-list">
      <good v-for="good in goods" :good="good" :key="good.id" v-if="good.popular" @addToCart="addToCart"></good>
    </div>
  `,
    methods: {
        addToCart(good) {
            console.log('из листа', good)
            this.$emit('add-to-cart', good)
        }
    }
});
Vue.component('cart', {
    props: ['cart'],
    template: `
       <div class="products_in_cart">
                <div class="cart_items">
                    <div class="product_in_cart" id='prod.id' v-for="prod of cart">
                        <img :src='prod.imgSrc' alt="" class="product_img">
                        <div class="description">
                            <h3>MANGO PEOPLE T-SHIRT</h3>
                            <p class="product_decr">Price: <span>$ {{prod.price}}</span></p>
                            <p class="product_decr">Color: Red</p>
                            <p class="product_decr">Size: Xl</p>
                            <label>
                                <span class="product_decr">Quantity:</span>
                                <input type="number" class="input_number" :value="prod.quant">
                            </label>
                            <button class="product-close" @click="$emit('remove', prod.id)" type="button">
                                <i class="far fa-window-close"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="cart_buttons">
                    <div class="">
                        <button class="cart_button clear" @click="$emit('clear')">Clear shopping cart</button>
                    </div>
                    <div class="">
                        <button class="cart_button" @click="$emit('shopping')">Continue shopping</button>
                    </div>
                </div>
            </div>
    `,
})
Vue.component('good', {
    props: ['good'],
    template: `
        <div class="good">
            <div class="fature_item" :id="good.id">
            <div class="overlay">
                <a href="cart.html">
                </a>
                    <button class="add_to_card_block" :id="good.id" type="button" @click="$emit('addToCart', good)">
                        <img src="img/cart.png" alt="">
                        <span>Add to Cart</span>
                    </button>
            </div>
            <a href="product.html">
                <img :src="good.imgSrc" alt="" class="feature_img">
                <h3>{{good.title}}</h3>
                <p class="pgf">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym
                    Ellery teams up with Moda Operandi.</p>
                <p class="price">$ {{ good.price }}</p>
            </a>
        </div>
        </div>
    `,
    methods: {
        addToCart(good) {
            this.$emit('add-to', good)
        }
    }
});
Vue.component('search', {
    data() {
        return {
            search_fld: '',
        }
    },
    template: `
    <form class="search">
       <label>
          <input type="text" placeholder="Search" class="search_field" v-model="search_fld" v-on:input="searchHandler">
       </label>
       <button type="submit" class="search_btn">Search</button>
    </form>
    `,
    methods: {
        searchHandler() {
            this.$emit('search', this.search_fld)
        }
    }
})

const vue = new Vue({
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
            searchHandler(str) {
                if (str === '') {
                    this.filtredGoods = this.goods;
                }
                const regexp = new RegExp(str, 'gim');
                this.filtredGoods = this.goods.filter((good) => good.title.match(regexp));
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
                    body: JSON.stringify(this.cart),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((result) => {
                    console.log(result)
                })
            },



            showBasket() {
                this.isVisibleCart = true;
                this.isVisibleCatalog = false;
                console.log(this.isVisibleCart)
            }
            ,
            continueShopping() {
                this.isVisibleCart = false;
                this.isVisibleCatalog = true;
            }
            ,
            clearCart() {
                this.cart = []
            }
            ,
            remove(id) {
                this.cart = this.cart.filter(p => p.id !== id)
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
                    }
                )
        }
        ,
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