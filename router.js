const ProductManager = require("./data/fs/ProductManager.js");
const UserManager = require("./data/fs/UserManager.js");
const products = new ProductManager();
const users = new UserManager();

async function router(req, res) {
  const url = req.url;
  console.log(url);
  const options = { "Content-Type": "text/plain" };
  switch (url) {
    case "/":
      res.writeHead(200, options).end("API CONECTADA");
      break;
    case "/api/products":
      const allProducts = await products.read();
      res.writeHead(200, options).end(JSON.stringify(allProducts));
      break;
    case "/users":
      const allUsers = await users.read();
      res.writeHead(200, options).end(JSON.stringify(allUsers));
      break;
    default:
      res.writeHead(404, options).end("RUTA NO ENCONTRADA");
      break;
  }
}

module.exports = router;
