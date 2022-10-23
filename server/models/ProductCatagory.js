module.exports = (sequelize, DataTypes) => {
    const ProductCatagory = sequelize.define("ProductCatagory", {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })

    ProductCatagory.associate = (models) => {
        ProductCatagory.hasMany(models.Products, {
            onDelete: "CASCADE"
        }),

        // foreign key access
        ProductCatagory.belongsTo(models.Users, {
            foreignKey: 'UserId',
        })
    }

    return ProductCatagory
}