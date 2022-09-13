const { DataTypes } = require('sequelize')
//exportamos una funcion que define el modelo
//luego le injectamos la conexion a sequelize
module.exports = (sequilize) => {
    //defino el modelo
    sequilize.define('food', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            }
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'No summary'
        }, 
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        stock:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    })
}