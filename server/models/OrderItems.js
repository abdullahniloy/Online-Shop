const Shops = require('./Shops')
module.exports = (sequelize, DataTypes) => {
    const OrderItems = sequelize.define("OrderItems", {
        quantity: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        OrderUniqueId:{
            type:DataTypes.STRING,
            allowNull:true,
        },
    })

    OrderItems.associate = (models) => {


        // foreign key access
        // OrderItems.belongsTo(models.Orders, {
        //     foreignKey: {
        //         name: 'OrderUniqueId',
        //         type:DataTypes.STRING,
        //         references: 'Orders', // <<< Note, its table's name, not object name
        //         referencesKey: 'OrderUniqueId' // <<< Note, its a column name
        //     },
        // })
    }

    return OrderItems
}