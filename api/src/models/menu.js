const { DataTypes } = require('sequelize')
//exportamos una funcion que define el modelo
//luego le injectamos la conexion a sequelize
module.exports = (sequilize) => {
    //defino el modelo
    sequilize.define('menu', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avaible: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
}