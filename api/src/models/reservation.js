const { DataTypes } = require('sequelize')
//exportamos una funcion que define el modelo
//luego le injectamos la conexion a sequelize
module.exports = (sequilize) => {
    //defino el modelo
    sequilize.define('reservation', {
        id_User: {
            type: DataTypes.INTEGER,
            ForeingKey: true
        },
        id_Table: {
            type: DataTypes.INTEGER,
            ForeingKey: true
        },

        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hour: {
            type: DataTypes.TIME,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Cant_User: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })
}