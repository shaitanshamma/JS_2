class Topping {
    constructor(title, price, nutrition) {
        this.title = title;
        this.price = price;
        this.nutrition = nutrition
    }
}

class Hamburger {
    constructor(title) {
        this.title = title
        this.basePrice = 10;
        this.baseNutrition = 80;
        this.ingridients = [];
        this.toppings = [];
    };

    addCheese() {
        this.ingridients.push({title: 'cheese', price: 10, nutrition: 20})
    }

    addSalad() {
        this.ingridients.push({title: 'salad', price: 20, nutrition: 5})
    }

    addPotato() {
        this.ingridients.push({title: 'potato', price: 15, nutrition: 10})
    }

    addTopping(topping) {
        this.toppings.push(topping)
    }

    removeTopping(topping) {
        for (let i = 0; i < this.toppings.length; i++) {
            if (this.toppings[i] === topping) {
                this.toppings.splice(i, 1)
                break
            }
        }
    }

    getPrice() {
        return this.toppings.reduce((total, item) => total + item.price, 0) +
            this.ingridients.reduce((total, item) => total + item.price, 0) + this.basePrice
    }

    getNutrition() {
        return this.toppings.reduce((total, item) => total + item.nutrition, 0) +
            this.ingridients.reduce((total, item) => total + item.nutrition, 0) + this.baseNutrition
    }
}

class BigHamburger extends Hamburger {
    constructor(title) {
        super(title);
        this.basePrice = 30;
        this.baseNutrition = 150;
    }
}

class SmallHamburger extends Hamburger {
    constructor(title) {
        super(title);
        this.basePrice = 150;
        this.baseNutrition = 80;
    }
}


let cheese = new Topping('cheese', 10, 30)
let bacon = new Topping('bacon', 13, 60)
let onion = new Topping('onion', 7, 15)
let tomato = new Topping('tomato', 9, 17)

let ham = new Hamburger('Joe')
let bigHam = new BigHamburger('Big Joe')
let smallHam = new SmallHamburger('Small Joe')


bigHam.addTopping(cheese)
bigHam.addTopping(bacon)
bigHam.addTopping(onion)
bigHam.addTopping(tomato)
bigHam.addSalad()
bigHam.addPotato()

console.log(bigHam)
console.log(bigHam.getNutrition(), 'калорийность')
console.log(bigHam.getPrice(), 'цена')
bigHam.removeTopping(bacon)
console.log(bigHam)

