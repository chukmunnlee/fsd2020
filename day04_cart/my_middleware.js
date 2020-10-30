
const getCart = (req, resp) => {
    const cart = []
    resp.status(200)
    resp.type('text/html')
    resp.render('index', { cartState: JSON.stringify(cart)})
}

const postCart = (req, resp) => {
        console.info('body: ', req.body)
        const cart = JSON.parse(req.body.cartState)
        cart.push({
            item: req.body.item,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice
        })
        resp.status(200)
        resp.type('text/html')
        resp.render('index', { 
            cart: cart,
            cartState: JSON.stringify(cart)
        })
    }

module.exports = { getCart, postCart }