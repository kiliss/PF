const { DataTypes } = require('sequelize')
//exportamos una funcion que define el modelo
//luego le injectamos la conexion a sequelize
module.exports = (sequilize) => {
    //defino el modelo
    sequilize.define('feedback', {
        valoration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
      timestamps: false,
    });
  }