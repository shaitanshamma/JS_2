const str = 'adadda " ssd " adad  " sdsd"s ssd"sd\n" sd sdsd" adadda " ssd " \nadad  " sdsd"s ssd"sd " sd sdsd" adadda " ssd " adad  " sdsd"s ssd"sd " sd sdsd" '

function simpleReg(str) {
    const reg = /"/gis
    return str.replace(reg, '\'')
}

console.log(str, 'исходная строка')
console.log(simpleReg(str), 'простая замена')
const str2 = simpleReg(str)

//
function modernReg(str) {
    const reg = /\B'|'\B/gis
    return str.replace(reg, '\"')
}

console.log(modernReg(str2), 'умная замена')
