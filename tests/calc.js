const summ = (a, b) => a + b;
const delim = (a, b) => a - b;
const mult = (a, b) => {
    if (a == null || b == null) {
        return 0
    }else if (typeof a==="string" || typeof b ==="string"){
        return 'строки не умножаем'
    }else if (a===undefined || b===undefined){
        return NaN
    }
    return a * b
};
const sep = (a, b) => {
    if (b === 0) {
        return Infinity
    }
    return a / b
}

module.exports = {
    summ, delim, mult, sep
}

console.log(undefined*2)