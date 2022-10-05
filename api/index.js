const { server } = require('./src/app.js');
const { conn, Menu, Food, Menu_food, User, Table } = require('./src/db.js');
const { QueryTypes } = require('sequelize');
// const { conn } = require('./src/db.js');

async function loadMenus() {
  const consumir = require('./consumir.json');

  const m = await conn.query(`SELECT last_value FROM public.menus_id_seq`, { replacements: ['active'], type: QueryTypes.SELECT });
  if (m[0]['last_value'] === '1') {
    Menu.bulkCreate(consumir.menu);
    await conn.query(`SELECT setval('public.menus_id_seq', ${consumir.menu.length}, true)`);
  }

  const f = await conn.query(`SELECT last_value FROM public.food_id_seq`, { replacements: ['active'], type: QueryTypes.SELECT });
  if (f[0]['last_value'] === '1') {
    Food.bulkCreate(consumir.food);
    await conn.query(`SELECT setval('public.food_id_seq', ${consumir.food.length}, true)`);
  }

  const mf = await conn.query(`SELECT last_value FROM public.menu_foods_id_seq`, { replacements: ['active'], type: QueryTypes.SELECT });
  if (mf[0]['last_value'] === '1') {
    Menu_food.bulkCreate(consumir.menu_food);
    await conn.query(`SELECT setval('public.menu_foods_id_seq', ${consumir.menu_food.length}, true)`);
  }

  const u = await conn.query(`SELECT last_value FROM public.users_id_seq`, { replacements: ['active'], type: QueryTypes.SELECT });
  if (u[0]['last_value'] === '1') {
    User.bulkCreate(consumir.user);
    await conn.query(`SELECT setval('public.users_id_seq', ${consumir.user.length}, true)`);
  }

  const t = await conn.query(`SELECT last_value FROM public.tables_id_seq`, { replacements: ['active'], type: QueryTypes.SELECT });
  if (t[0]['last_value'] === '1') {
    Table.bulkCreate(consumir.table);
    await conn.query(`SELECT setval('public.tables_id_seq', ${consumir.table.length}, true)`)
  }
};

conn.sync({ force: false }).then(async () => {
  loadMenus();
  server.listen(process.env.PORT, () => {
    console.log(`Restaurant listening at ${process.env.PORT}`);
  });
});
