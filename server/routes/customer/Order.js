const express = require('express')
const router = express.Router()
const { validateToken } = require('../../middleware/AuthMiddleware')
const { Users, Shops, Products, Orders, OrderItems, Transaction } = require('../../models')
const stripe = require("stripe")("sk_test_51KxmxpGZcKqiV6JyYHPkJUBljTdRcVn2UY2fhaQ22tPbMqfPAwzDjyIEisTM4lMxCLXk7Os40FRKmKJ030tVJyeE008pQBVrcI");
// register

router.get('/', async (req, res) => {
    const shops = await Shops.findAll()
    // console.log(shops)
    res.json(shops)
})

router.get('/selectedshop/:s_id', async (req, res) => {
    const s_id = req.params.s_id

    const shopProducts = await Shops.findOne({ where: { id: s_id }, include: [Products] })

    res.json(shopProducts)
})

router.post('/placeorder', validateToken, async (req, res) => {

    let error;
    let status;

    const { id } = req.user
    const { total_cost, currentCart, token } = req.body
    const OrderUniqueId = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const charge = await stripe.charges.create(
            {
                amount: total_cost * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the products.`,
                // shipping: {
                //     name: token.card.name,
                //     address: {
                //         line1: token.card.address_line1,
                //         line2: token.card.address_line2,
                //         city: token.card.address_city,
                //         country: token.card.address_country,
                //         postal_code: token.card.address_zip
                //     }
                // }
            },
            {
                idempotencyKey: OrderUniqueId,
            }
        );
        // console.log("Charge:", { charge });
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }


    Orders
        .create({
            amount_paid: total_cost,
            total_cost: total_cost,
            OrderUniqueId,
            UserId: id
        }).then(response => {
            currentCart.map(item => {
                OrderItems.create({
                    quantity: item.quantity,
                    price: item.price,
                    OrderUniqueId: OrderUniqueId,
                    ProductId: item.id,
                }).then(response => {

                }).catch(err => {
                    console.log(err)
                })
            })
    }).catch(err => {
        console.log(err)
        res.json({ error: "Order Placing Failed." })
    })

    Transaction.create({
        amount_paid: total_cost,
        OrderUniqueId,
        UserId: id
    }).then(response=>{}).catch(err => {
        console.log(err)
        res.json({ error: "Order Placing Failed." })
    })
    res.json({ error, status });
})

router.get('/getorder', validateToken, async (req, res) => {
    const { id } = req.user
    const orders = await Orders.findAll({ where: { UserId: id } })
    res.json(orders)
})


module.exports = router