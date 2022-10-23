const express = require("express")
const app = express()
const cors = require("cors");



app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
const db = require('./models')

// shopkeeper route
app.use("/auth", require('./routes/Auth'));
app.use("/profile", require('./routes/profile/Profile'));
app.use("/shop", require('./routes/ShopKeeper/Shops'));
app.use("/product-catagory", require('./routes/ShopKeeper/ProductCatagory'));
app.use("/products", require('./routes/ShopKeeper/Products'));
//admin route
app.use("/admin", require('./routes/Admin/Admin'));
// customer route
app.use('/', require('./routes/customer/Order'))


app.get('/', (req, res) => {
    res.send('Server Started!')
})

db.sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server Started For ${port}`)
    })
})
