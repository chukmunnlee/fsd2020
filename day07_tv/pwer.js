const power = (x, y) => {
    // x to the power y
    let ans = 1
    for (i = 0; i < y; i++) {
        ans = ans * x
    }
    return ans
}

console.info('2^3 = ', power(2, 3))
console.info('3^3 = ', power(3, 3))

const mkPower = (y) => {
    const power = (x) => {
        // x to the power y
        let ans = 1
        for (i = 0; i < y; i++) {
            ans = ans * x
        }
        return ans
    }
    return power
}

const square = mkPower(2)
const cube = mkPower(3)
const quad = mkPower(4)

console.info(`square 5: `, square(5))
console.info(`cube 5: `, cube(5))
console.info(`quad 5: `, quad(5))