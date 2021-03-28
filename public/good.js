export const Good = {
    props: ['good'],
    template: `
        <div class="good">
            <div class="fature_item" :id="good.id">
            <div class="overlay">
                <a href="../old_html/cart.html">
                </a>
                    <button class="add_to_card_block" :id="good.id" type="button" @click="$emit('addToCart', good)">
                        <img src="../img/cart.png" alt="">
                        <span>Add to Cart</span>
                    </button>
            </div>
            <a href="../product.html">
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
}