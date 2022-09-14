const server = require('./src/app.js');
const { conn, Menu } = require('./src/db.js');
// const { conn } = require('./src/db.js');

async function loadMenus() {
  const menus = require('./menus.json');
  let db = await Menu.findAll();
  if(db.length === 0){
    Menu.bulkCreate(menus);
  }
};


conn.sync({ force: false }).then(async() => {
  loadMenus();
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3001");
  });
});
