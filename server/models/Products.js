module.exports = (sequelize, DataTypes) =>{
    const Products = sequelize.define("Products",{
        name:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        price:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        discount:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        quantity:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },
        image:{
            type:DataTypes.STRING,
            allowNull:true,
        },
  
    })

    Products.associate = (models )=>{
        Products.hasMany( models.Reviews, {
            onDelete: "CASCADE"
        }),
        Products.hasMany( models.OrderItems, {
            onDelete: "CASCADE"
        }),

        // foreign key
        Products.belongsTo( models.Shops, {
            foreignKey: 'ShopId',
        }),
        Products.belongsTo( models.ProductCatagory, {
            foreignKey: 'ProductCatagoryId',
        }),
        Products.belongsTo( models.Users, {
            foreignKey: 'UserId',
        })
    }

    return Products
}