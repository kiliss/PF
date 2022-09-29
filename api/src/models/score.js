const { DataTypes } = require('sequelize')
module.exports = (sequilize) => {
    sequilize.define('score', {
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
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            timestamps: false,
            initialAutoIncrement: 1000
        });
}