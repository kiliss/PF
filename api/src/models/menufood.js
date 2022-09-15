const { DataTypes } = require('sequelize')
module.exports = (sequilize) => {
    sequilize.define('menu_food', {
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
        });
}