const cust = { name: 'fred', email: 'fred@gmail.com' }

const order = { 
	// spread the attributes from cust
	...cust, 
	date: new Date(), 
	comments: 'urgent' 
}

console.info(order)

const nums = [3, 4, 5, 6, 7]

const f = (a, b) => a + b

console.info('spread elements: ', f(...nums))
