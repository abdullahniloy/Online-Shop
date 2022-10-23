module.exports = (sequelize, DataTypes) =>{
    const Transaction = sequelize.define("Transaction",{
        amount_paid:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        OrderUniqueId:{
            type:DataTypes.STRING,
            allowNull:true,
        },
    })

    Transaction.associate = (models )=>{
        Transaction.belongsTo( models.Users, {
            foreignKey: 'UserId',
        })
    }

    return Transaction
}