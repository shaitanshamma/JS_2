// class Topping {
//     constructor(title, price, nutrition) {
//         this.title = title;
//         this.price = price;
//         this.nutrition = nutrition
//     }
// }
//
// class Hamburger {
//     constructor(title) {
//         this.title = title
//         this.basePrice = 10;
//         this.baseNutrition = 80;
//         this.ingridients = [];
//         this.toppings = [];
//     };
//
//     addCheese() {
//         this.ingridients.push({title: 'cheese', price: 10, nutrition: 20})
//     }
//
//     addSalad() {
//         this.ingridients.push({title: 'salad', price: 20, nutrition: 5})
//     }
//
//     addPotato() {
//         this.ingridients.push({title: 'potato', price: 15, nutrition: 10})
//     }
//
//     addTopping(topping) {
//         this.toppings.push(topping)
//     }
//
//     removeTopping(topping) {
//         for (let i = 0; i < this.toppings.length; i++) {
//             if (this.toppings[i] === topping) {
//                 this.toppings.splice(i, 1)
//                 break
//             }
//         }
//     }
//
//     getPrice() {
//         return this.toppings.reduce((total, item) => total + item.price, 0) +
//             this.ingridients.reduce((total, item) => total + item.price, 0) + this.basePrice
//     }
//
//     getNutrition() {
//         return this.toppings.reduce((total, item) => total + item.nutrition, 0) +
//             this.ingridients.reduce((total, item) => total + item.nutrition, 0) + this.baseNutrition
//     }
// }
//
// class BigHamburger extends Hamburger {
//     constructor(title) {
//         super(title);
//         this.basePrice = 30;
//         this.baseNutrition = 150;
//     }
// }
//
// class SmallHamburger extends Hamburger {
//     constructor(title) {
//         super(title);
//         this.basePrice = 150;
//         this.baseNutrition = 80;
//     }
// }
//
//
// let cheese = new Topping('cheese', 10, 30)
// let bacon = new Topping('bacon', 13, 60)
// let onion = new Topping('onion', 7, 15)
// let tomato = new Topping('tomato', 9, 17)
//
// let ham = new Hamburger('Joe')
// let bigHam = new BigHamburger('Big Joe')
// let smallHam = new SmallHamburger('Small Joe')
//
//
// bigHam.addTopping(cheese)
// bigHam.addTopping(bacon)
// bigHam.addTopping(onion)
// bigHam.addTopping(tomato)
// bigHam.addSalad()
// bigHam.addPotato()
//
// console.log(bigHam)
// console.log(bigHam.getNutrition(), 'калорийность')
// console.log(bigHam.getPrice(), 'цена')
// bigHam.removeTopping(bacon)
// console.log(bigHam)
//
// const a = null;
// console.log(a===null)
// console.log(a==null)
// console.log(a==undefined)
// console.log(a===undefined)
//
// const a = [1,2,3,4,5]
// console.log(new Date(2019,0,2))
// // a.filter((i,el) => el !== 4)
// console.log(a.filter((i,el) => el !== 4))
//
// const b=/abc/
// console.log(typeof b)
//
// let from = 1;
// let required = 1;


//
// const a = 5;
//
// const b = a => a
//
// console.log(b)


//
// const a = undefined;
//
// console.log(a === undefined);
//
// console.log(a == undefined);
// console.log(a == null);
// console.log(a === null);

// fetch('www.google.com').then(response=>{console.log(response.status)})


// const per ={name:1, age:2}
// per = {...per, age: 3, job:"dev"}
// console.log(per)
// //
// const a= /abc/
// const b= /cde/
// console.log(typeof (b+1))

// const a =[1,2,3]
// console.log(a.map((e,i)=> i!==0))

// const b =[...a]
//
// a[0] =5
//
// console.log(b)
// console.log(a)

// let p ={
//     a:1,
//     static count(){
//
// }
// }
// const{a,b,c} = person

// class A {
//     constructor() {
//         this.count = 0;
//         A.c()
//     }
//     static c(){
//         this.count++;
//     }
// }
//
// let a = new A();
// let b = new A()
//
// console.log(b.count)

// let a = new Promise((resolve, reject) => {
//         setTimeout(()=>{
//             console.log(1)
//             reject('2')
//         },1000)
// }).then(res=>console.log('1')).catch((e)=>console.log(3))

// let t = setInterval(() => {
//     setTimeout(() => {
//         clearInterval(t)
// }, 3000)
// console.log('ghbdtn');
// },
// 1000
// )

// console.log(new Date(2019,0,0))
//
// let a = (...args)=>{
//     return args[0] + args[1]
// }

// console.log(new Date(1543990506864).getTime())

