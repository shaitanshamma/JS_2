export const Cart ={
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
}
