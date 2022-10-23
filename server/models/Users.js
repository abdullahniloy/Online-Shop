const Shops = require('./Shops')
module.exports = ( sequelize, DataTypes) =>{
    const Users = sequelize.define("Users",{
        username:{
            type:DataTypes.STRING,
            allowNull:true,
            unique: true
        },
        email:{
            type:DataTypes.STRING,
            allowNull:true,
            unique: true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        first_name:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        phone_number:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        block_status:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        address:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        nid:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        bkash_number:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        type:{
            type:DataTypes.STRING,
            allowNull:true,
        },
    },{
        indexes: [
            {
                unique: true,
                fields: ['username', 'email']
            }
        ]
    })

    Users.associate = ( models) =>{
        Users.hasMany( models.Shops, {
            onDelete: "cascade",
            allowNull:false,
        }),
        Users.hasMany( models.Reviews, {
            onDelete: "CASCADE",
            allowNull:false,
        }),
        Users.hasMany( models.Orders, {
            onDelete: "CASCADE",
            allowNull:false,
        }),
        Users.hasMany( models.ProductCatagory, {
            onDelete: "CASCADE",
            allowNull:false,
        }),
        Users.hasMany( models.Products, {
            onDelete: "CASCADE",
            allowNull:false,
        })
        Users.hasMany( models.Transaction, {
            onDelete: "CASCADE",
            allowNull:false,
        })
    }



    return Users
}