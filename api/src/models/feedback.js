const { DataTypes } = require('sequelize')
//exportamos una funcion que define el modelo
//luego le injectamos la conexion a sequelize
module.exports = (sequilize) => {
    //defino el modelo
    sequilize.define('feedback', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        foodId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false,
            initialAutoIncrement: 1000
        });
}