module.exports = (sequelize, DataTypes) =>{
    const Reviews = sequelize.define("Reviews",{
        rating:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        message:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        
    })

    return Reviews
}