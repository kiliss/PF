const { DataTypes } = require('sequelize')
module.exports = (sequilize) => {
    sequilize.define('menu_food', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        foodId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        menuId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            timestamps: false,
            initialAutoIncrement: 1000
        });
}