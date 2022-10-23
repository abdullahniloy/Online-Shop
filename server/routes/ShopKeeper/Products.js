const express = require('express')
const router = express.Router()
const { validateToken } = require('../../middleware/AuthMiddleware')
const { ProductCatagory, Shops, Products, Users } = require('../../models')
// register

// add product
router.post('/add-product', validateToken, async (req, res) => {
    const { id } = req.user
    const data = req.body
    Products.create({ ...data, UserId: id })
        .then(response => res.json("success"))
        .catch(err => {
            console.log(err)
            res.json({ error: "failed" })
        })
})

router.get('/', validateToken, async (req, res) => {
    const { id } = req.user
    const productCatagoryList = await ProductCatagory.findAll({ where: { UserId: id } })
    const shopList = await Shops.findAll({ where: { UserId: id } })
    res.json({ productCatagoryList, shopList })
})

// get all products
router.get('/get-all-product', validateToken, async (req, res) => {
    const { id } = req.user
    const product = await Products.findAll({ where: { UserId: id }, include: [Users, Shops, ProductCatagory] })
        .then(response => {
            // console.log(response);
            res.send(response);
        }).catch(err => {
            console.log('Oops! something went wrong, : ', err);
            res.send({ error: 'Oops! something went wrong' });
        })
})

// delete product
router.delete('/delete/:id', validateToken, async (req, res) => {
    const id = req.params.id
    // console.log(id)
    const result = Products.destroy({ where: { id: id } }).then(response => {
        res.json("SUCCESS")
    }).catch(err => {
        console.log(err)
        res.json()
    })
})


// get product for edit
router.get('/edit-products/:p_id', validateToken, async (req, res) => {
    const p_id = req.params.p_id

    const { id } = req.user
    const productCatagoryList = await ProductCatagory.findAll({ where: { UserId: id } })
    const shopList = await Shops.findAll({ where: { UserId: id } })
    const product = await Products.findOne({ where: { id: p_id }, include: [Users, Shops, ProductCatagory] })
        .then(response => {
            // console.log(response);
            // res.send(response);
            return response
        }).catch(err => {
            // console.log('Oops! something went wrong, : ', err);
            // res.send({ error: 'Oops! something went wrong' });
            return err
        })
    res.json({ productCatagoryList, shopList, product })
})

//edit product
router.put('/edit-products/:p_id', validateToken, async (req, res) => {
    const p_id = req.params.p_id

    const { id } = req.user
    const data = req.body
    Products.update({...data,UserId:id},
        {where:{id:p_id}}) 
        .then(result =>
        {
            console.log(result)
            res.json('updated')
        }
      )
      .catch(err =>
        res.json({error:'Failed'})
      )
})

module.exports = router