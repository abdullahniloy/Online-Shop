module.exports = (sequelize, DataTypes) =>{
    const ShopCatagory = sequelize.define("ShopCatagory",{
        name:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        image:{
            type:DataTypes.STRING,
            allowNull:true,
        },
    },{
        indexes: [
            {
                unique: true,
                fields: ['name']
            }
        ]
    })

    ShopCatagory.associate = (models) =>{
        ShopCatagory.hasMany(models.Shops, {
            onDelete: "cascade"
        })
    }

    return ShopCatagory
}