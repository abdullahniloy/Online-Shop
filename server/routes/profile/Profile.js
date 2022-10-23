const express = require('express')
const router = express.Router()
const { validateToken } = require('../../middleware/AuthMiddleware')
const { Users } = require('../../models')
// register

router.get('/', validateToken, async (req, res) => {
    const { email } = req.user
    const user = await Users.findOne({ where: { email } })
    res.json(user)
})

router.put('/edit-profile', validateToken, async (req, res) => {
    const { id } = req.user
    const data = req.body
    Users.update({...data},{where:{id:id}}) .then(result =>
        {
            console.log(result)
            res.json('updated')
        }
      )
      .catch(err =>
        res.json({error:' UserName Must be uniqe.'})
      )
    // console.log(data)
    // res.json('Helo')
})



module.exports = router