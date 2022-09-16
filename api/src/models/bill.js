const { DataTypes } = require('sequelize')
//exportamos una funcion que define el modelo
//luego le injectamos la conexion a sequelize
module.exports = (sequilize) => {
    //defino el modelo
    sequilize.define('bill', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        total_price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        id_User: {
            type: DataTypes.INTEGER,
            allowNull: false,
            ForeingKey: true
        },
        id_Order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            ForeingKey: true
        },
        pay_method: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false,
            initialAutoIncrement: 1000
        });
}