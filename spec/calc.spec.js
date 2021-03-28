const calc = require('../tests/calc')

const summ = calc.summ
const delim = calc.delim
const mult = calc.mult
const sep = calc.sep

describe('Функция summ', ()=>{
    it('should 3 при аргументах 1 и 2', function () {
        expect(summ(1,2)).toBe(3)
    });
})

describe('Функция delim', ()=>{
    it('should 3 при аргументах 5 и 2', function () {
        expect(delim(5,2)).toBe(3)
    });
})

describe('Функция mult', ()=>{
    it('should 10 при аргументах 5 и 2', function () {
        expect(mult(5,2)).toBe(10)
    });
    it('should Nan при аргументах 5 и null', function () {
        expect(mult(5,null)).toBe(0)
    });
    it('should Error при аргументах 5 и string', function () {
        expect(mult(5,'sdsd')).toBe("строки не умножаем")
    });
    it('should Nan при аргументах 5 и undefined', function () {
        expect(mult(5,undefined)).toBe(NaN)
    });
})

describe('Функция sep', ()=>{
    it('should 2 при аргументах 10 и 5', function () {
        expect(sep(10,5)).toBe(2)
    });
    it('should Infinity при аргументах 10 и 0', function () {
        expect(sep(10,0)).toBe(Infinity)
    });
})