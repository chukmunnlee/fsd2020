const hello = (name) => {
    console.info(`Hello ${name}`)
}

// greet fred
hello('fred')

// greet barney
hello('barney')

const mkGreeting = (name) => {
    const hello = () => {
        console.info(`Hello ${name}`)
    }
    return hello
}

const greetFred = mkGreeting('fred')
const greetBarney = mkGreeting('barney')

console.info(`greetFred: ${greetFred}`)

greetFred()
greetBarney()