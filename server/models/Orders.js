const Shops = require('./Shops')
module.exports = ( sequelize, DataTypes) =>{
    const Orders = sequelize.define("Orders",{
        amount_paid:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        total_cost:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        
        OrderUniqueId:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        
    })

    Orders.associate = ( models) =>{
   
        // Orders.hasMany( models.OrderItems, {
        //     foreignKey: {
        //         name:'OrderUniqueId',
        //         type:DataTypes.STRING,
        //     },
        //     // foreignKeyConstraint:true
        // }),
        // Orders.hasMany( models.Transaction, {
        //     onDelete: "CASCADE",
        // }),

        // foreign key access
        Orders.belongsTo( models.Users, {
            foreignKey: 'UserId',
        })
    }


    return Orders
}