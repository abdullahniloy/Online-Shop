const express = require('express')
const router = express.Router()
const { validateToken } = require('../../middleware/AuthMiddleware')
const { ProductCatagory  } = require('../../models')
// register

router.post('/add-product-catagory', validateToken, async (req, res) => {
    const { id } = req.user
    const { name } = req.body
    ProductCatagory.create({
        name: name,
        UserId: id
    }).then(response => res.json('SUCCESS')).catch(err => {
        console.log(err)
        res.json({ error: "Product Name Must Be Unique." })
    })
})

router.get('/', validateToken, async (req, res) => {
    const { id } = req.user
    const productCatagoryList = await ProductCatagory.findAll({ where: { UserId: id } })
    res.json(productCatagoryList)
})



module.exports = router