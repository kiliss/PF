const { DataTypes } = require("sequelize");
//exportamos una funcion que define el modelo
//luego le injectamos la conexion a sequelize
module.exports = (sequilize) => {
  //defino el modelo
  sequilize.define("message", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return timeSince(this.getDataValue('date'));
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
    {
      timestamps: false,
      initialAutoIncrement: 1000
    });
}

const timeSince = (stringDate) => {
  var date = new Date(stringDate);

  var seconds = Math.floor((new Date() - date) / 1000);

  var years = seconds / 31536000;
  if (years === 1) return `hace ${Math.floor(years)} año`;
  if (years > 1) return `hace ${Math.floor(years)} años`;

  var months = seconds / 2592000;
  if (months === 1) return `hace ${Math.floor(months)} mes`;
  if (months > 1) return `hace ${Math.floor(months)} meses`;

  var days = seconds / 86400;
  if (days === 1) return `hace ${Math.floor(days)} día`;
  if (days > 1) return `hace ${Math.floor(days)} días`;

  var hours = seconds / 3600;
  if (hours === 1) return `hace ${Math.floor(hours)} hora`;
  if (hours > 1) return `hace ${Math.floor(hours)} horas`;

  var minutes = seconds / 60;
  if (minutes === 1) return `hace ${Math.floor(minutes)} minuto`;
  if (minutes > 1) return `hace ${Math.floor(minutes)} minutos`;

  if (seconds === 0) return `justo ahora`;
  if (seconds === 1) return `hace ${Math.floor(seconds)} segundo`;
  return `hace ${Math.floor(seconds)} segundos`;
}