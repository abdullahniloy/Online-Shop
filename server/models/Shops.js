module.exports = (sequelize, DataTypes) =>{
    const Shops = sequelize.define("Shops",{
        name:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        rating:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        subscription:{
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

    Shops.associate = ( models) =>{
        Shops.hasMany( models.Products, {
            onDelete: "CASCADE",
            allowNull:false,
        }),

        Shops.belongsTo(models.Users, {
            foreignKey: 'UserId',
        })
    }

    return Shops
}