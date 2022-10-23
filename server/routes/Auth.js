const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const { Users } = require('../models')
const { sign } = require("jsonwebtoken");
const { validateToken } = require('../middleware/AuthMiddleware')

// register
router.post('/', async(req, res) => {
  const { email, password, type } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        email: email,
        password: hash,
        type: type,
      }).then((response)=> res.json("SUCCESS")).catch(err=>{
        console.log(err)
        res.json({error:'Please select a different username.'})
      })
    });
})


// 
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) return res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong email And Password Combination" });

    // have to add type to this
    const accessToken = sign(
      { email: user.email, id: user.id, type: user.type },
      "importantsecret"
    );
    user.password = '';
    res.json({accessToken,user});
  });
});

router.get("/verify", validateToken, async (req, res) => {
  res.json(req.user)
});


module.exports = router