const obj = {
	name: 'fred',
	email: 'fred@gmail.com'
}

const jsonString = JSON.stringify(obj)
const str = 'my name is fred'

console.info('> object: ', obj)
console.info('> json string: ', jsonString)
console.info('> json obj: ', JSON.parse(jsonString))
console.info('> json obj: ', JSON.parse(str))
