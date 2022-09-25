const server = require('./src/app.js');
const { conn, Menu, Food, Menu_food, User,Table } = require('./src/db.js');
// const { conn } = require('./src/db.js');

async function loadMenus() {
  const consumir = require('./consumir.json');
  Menu.bulkCreate(consumir.menu);
  Food.bulkCreate(consumir.food);
  Menu_food.bulkCreate(consumir.menu_food);
  User.bulkCreate(consumir.user);
  Table.bulkCreate(consumir.table);
  await conn.query(`SELECT setval('public.menus_id_seq', ${consumir.menu.length}, true)`);
  await conn.query(`SELECT setval('public.food_id_seq', ${consumir.food.length}, true)`);
  await conn.query(`SELECT setval('public.menu_foods_id_seq', ${consumir.menu_food.length}, true)`);
  await conn.query(`SELECT setval('public.users_id_seq', ${consumir.user.length}, true)`);
  //await conn.query(`SELECT setval('public.table_id_seq', ${consumir.table.length}, true)`)
};


conn.sync({ force: true }).then(async () => {
  loadMenus();
  server.listen(process.env.PORT, () => {
    console.log(`Restaurant listening at ${process.env.PORT}`);
  });
});
