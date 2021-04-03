import {Good} from "./good.js";

export const Goods ={
    components:{
      Good
    },
    data() {
        return {

        };
    },
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
}