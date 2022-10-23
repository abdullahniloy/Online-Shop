const express = require('express')
const router = express.Router()
const { validateToken } = require('../../middleware/AuthMiddleware')
const { Users, Shops, Products, ProductCatagory } = require('../../models')
// register

router.get('/all-users', validateToken, async (req, res) => {
    const user = await Users.findAll()
    res.json(user)
})

router.delete('/delete/:id', validateToken, async (req, res) => {
    const id = req.params.id
    const result = Users.destroy({ where: { id: id } }).then(response => {
        res.json("SUCCESS")
    }).catch(err => {
        console.log(err)
        res.json()
    })
})


router.get('/all-shops', validateToken, async (req, res) => {
    const shops = await Shops.findAll({ include: [Users] })
    res.json(shops)
})

router.delete('/all-shops/delete/:id', validateToken, async (req, res) => {
    const id = req.params.id
    const result = Shops.destroy({ where: { id: id } }).then(response => {
        res.json("SUCCESS")
    }).catch(err => {
        console.log(err)
        res.json()
    })
})

router.get('/all-pro-cat', validateToken, async (req, res) => {
    const procat = await ProductCatagory.findAll({ include: [Users] })
    res.json(procat)
})

router.delete('/all-pro-cat/delete/:id', validateToken, async (req, res) => {
    const id = req.params.id
    const result = ProductCatagory.destroy({ where: { id: id } }).then(response => {
        res.json("SUCCESS")
    }).catch(err => {
        console.log(err)
        res.json()
    })
})

router.get('/all-products', validateToken, async (req, res) => {
    const procat = await Products.findAll({ include: [Users,Shops, ProductCatagory] })
    res.json(procat)
})

router.delete('/all-products/delete/:id', validateToken, async (req, res) => {
    const id = req.params.id
    const result = Products.destroy({ where: { id: id } }).then(response => {
        res.json("SUCCESS")
    }).catch(err => {
        console.log(err)
        res.json()
    })
})

module.exports = router