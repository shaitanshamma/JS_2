class Topping {
    constructor(title, price, nutrition) {
        this.title = title;
        this.price = price;
        this.nutrition = nutrition
    }
}

class Hamburger{
    constructor(title) {
        this.title = title
    };
    basePrice = 10;
    baseNutrition = 80;
    ingridients =[];
    toppings =[];
    addCheese(){
        this.ingridients.push({title:'cheese',price: 10, nutrition: 20})
    }
    addSalad(){
        this.ingridients.push({title:'salad',price: 20, nutrition: 5})
    }
    addPotato(){
        this.ingridients.push({title:'potato',price: 15, nutrition: 10})
    }
    addTopping(topping){
        this.toppings.push(topping)
    }
    getPrice(){
        return  this.toppings.reduce((total, item) =>total+ item.price, 0) +
            this.ingridients.reduce((total, item)=>total + item.price, 0)
    }
    getNutrition(){
        return this.toppings.reduce((total, item) =>total+ item.nutrition, 0) +
            this.ingridients.reduce((total, item)=>total + item.nutrition, 0)
    }
}

class BigHamburger extends Hamburger{
    constructor(title) {
        super(title);
    }
    basePrice = 30;
    baseNutrition = 150;
    getNutrition() {
        return super.getNutrition() + this.baseNutrition;
    }
    getPrice() {
        return super.getPrice() + this.basePrice;
    }
}

class SmallHamburger extends Hamburger{
    constructor(title) {
        super(title);
    }
    basePrice = 150;
    baseNutrition = 80;
    getNutrition() {
        return super.getNutrition() + this.baseNutrition;
    }
    getPrice() {
        return super.getPrice() + this.basePrice;
    }
}


let cheese = new Topping('cheese', 10, 30)
let bacon = new Topping('bacon', 13, 60)
let onion = new Topping('onion', 7, 15)
let tomato = new Topping('tomato', 9, 17)

let  ham = new Hamburger('Joe')
let  bigHam = new BigHamburger('Big Joe')
let  smallHam = new SmallHamburger('Small Joe')



bigHam.addTopping(bacon, cheese, onion, tomato)
bigHam.addSalad()
bigHam.addPotato()

console.log(bigHam)
console.log(bigHam.getNutrition(), 'калорийность')
console.log(bigHam.getPrice(), 'цена')
