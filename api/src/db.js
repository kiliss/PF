require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
} = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
            max: 3,
            min: 1,
            idle: 10000,
        },
        dialectOptions: {
            ssl: {
            require: true,
              // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
            },
            keepAlive: true,
        },
        ssl: true,
        })
    : new Sequelize(
            `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/restaurant`,
            { logging: false, native: false }
        );

const basename = path.basename(__filename);
const modelDefiners = [];


// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Bill, Foodcount, Food, Reservation, Table, User, Menu, Feedback, Order, Menu_food, Score, Message } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
User.hasMany(Feedback);
Feedback.belongsTo(User);

// Reservation.hasMany(User);
// User.belongsTo(Reservation);

User.hasMany(Bill);
Bill.belongsTo(User);

Bill.hasMany(Order);
Order.belongsTo(Bill);

Table.hasMany(Order);
Order.belongsTo(Table);

Order.hasMany(Foodcount);
Foodcount.belongsTo(Order);

Food.hasMany(Foodcount);
Foodcount.belongsTo(Food);

User.belongsToMany(Reservation, { through: 'User_reservation' });
Reservation.belongsToMany(User, { through: 'User_reservation' });

Table.belongsToMany(Reservation, { through: 'Table_reservation' });
Reservation.belongsToMany(Table, { through: 'Table_reservation' });

Food.belongsToMany(Menu, { through: Menu_food });
Menu.belongsToMany(Food, { through: Menu_food });

Food.hasMany(Score);
Score.belongsTo(Food);

User.hasMany(Score);
Score.belongsTo(User);

Food.hasMany(Feedback);
Feedback.belongsTo(Food);

User.hasMany(Feedback);
Feedback.belongsTo(User);

User.hasMany(Message);
Message.belongsTo(User);


module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

