const API_URL = 'database/database.json';

const vue = new Vue({
    el: "#container",
    data: {
        goods: [],
        filtredGoods: [],
        cart: [],
        search_fld: '',
        basketNum:document.getElementById("basket__count"),
        isVisibleCart:false,
        isVisibleCatalog:true,
    },
    methods: {
        searchHandler() {
            if (this.search_fld === '') {
                this.filtredGoods = this.goods;
            }
            const regexp = new RegExp(this.search_fld, 'gi');
            this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
        },

        fetch(error, success) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        success(JSON.parse(xhr.responseText));
                    } else if (xhr.status > 400) {
                        error('все пропало');
                    }
                }
            }

            xhr.open('GET', API_URL, true);
            xhr.send();
        },

        fetchPromise() {
            return new Promise((resolve, reject) => {
                this.fetch(reject, resolve)
            })
        },
        addToCart(good){
            let isInCart = false
            for (let i = 0; i < this.cart.length; i++) {
                let key = this.cart[i].id
                console.log(key, 'key')
                console.log(good.id, 'id')
                if (key === good.id) {
                    good.quant += 1
                    console.log(good)
                    isInCart = true
                }
            }
            if (!isInCart) {
                this.cart.push(good)
            }
            this.basketNum.style.display ='block';
            this.basketNum.textContent = `${this.cart.length}`;
        },
        showBasket(){
            this.isVisibleCart = true;
            this.isVisibleCatalog = false;
            console.log(this.isVisibleCart)
        },
        continueShopping(){
            this.isVisibleCart = false;
            this.isVisibleCatalog = true;
        }
    },
    mounted() {
        this.fetchPromise()
            .then(data => {
                this.goods = data;
                this.filtredGoods = data;
            })
            .catch(err => {
                console.log(err);
            })
    }
});
//
// Vue.component('good', {
//     props: ['good'],
//     template: `
//         <div class="good">
//             <div class="fature_item" :id="good.id">
//             <div class="overlay">
//                 <a href="cart.html">
//                 </a>
//                     <button class="add_to_card_block" :id="good.id" type="button">
//                         <img src="img/cart.png" alt="">
//                         <p>Add to Cart</p>
//                     </button>
//             </div>
//             <a href="product.html">
//                 <img :src="good.imgSrc" alt="" class="feature_img">
//                 <h3>{{good.title}}</h3>
//                 <p class="pgf">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym
//                     Ellery teams up with Moda Operandi.</p>
//                 <p class="price">$ {{ good.price }}</p>
//             </a>
//         </div>
//         </div>
//     `
// })
//
// Vue.component('goods-list', {
//     props: ['goods'],
//     template: `
//     <div class="goods-list">
//       <good v-for="good in goods" :good="good" :key="good.id"></good>
//     </div>
//   `
// })
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