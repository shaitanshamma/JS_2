const summ = (a, b) => a + b;
const delim = (a, b) => a - b;
const mult = (a, b) => {
    if (a == null || b == null) {
        return 0
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