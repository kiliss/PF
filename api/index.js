const server = require('./src/app.js');
const { conn, Menu, Food, Menu_food } = require('./src/db.js');
// const { conn } = require('./src/db.js');

async function loadMenus() {
  const consumir = require('./consumir.json');
  Menu.bulkCreate(consumir.menu);
  Food.bulkCreate(consumir.food);
  Menu_food.bulkCreate(consumir.menu_food);
  await conn.query("SELECT setval('public.menus_id_seq', 1000, true)");
  await conn.query("SELECT setval('public.food_id_seq', 1000, true)");
  await conn.query("SELECT setval('public.menu_foods_id_seq', 1000, true)");
};


conn.sync({ force: true }).then(async () => {
  loadMenus();
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3001");
  });
});
