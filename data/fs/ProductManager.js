const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.path = "./files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Archivo creado");
    } else {
        console.log('Archivo ya existe');
    }
  }

  async create(data) {
    try {
      if (!data.title, !data.category, !data.price, !data.stock) {
        throw new Error('Ingrese todos los datos');
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title : data.title,
          photo : data.photo,
          category : data.category,
          price : data.price,
          stock : data.stock
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(product);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        console.log({ created: product.id });
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let product = all.find((each) => each.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      } else {
        console.log(product);
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let product = all.find((each) => each.id === id);
      if (!product) {
        throw new Error("Producto no encontrado");
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log({ deleted: product.id });
        return note;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function test() {
    try {
      const products = new ProductManager();
      await products.create({ 
        title: "comic 1",
        photo: "comic.pdf",
        category: "comics",
        price: 4000,
        stock: 200,
    });
      await products.create({
        title: "comic 2",
        photo: "comic.pdf",
        category: "comics",
        price: 5000,
        stock: 400,
      });
      await products.read();
      //await products.readOne("eb2c7b38869b298053cf752d");
      //await products.destroy("eb2c7b38869b298053cf752d");
    } catch (error) {
      console.log(error);
    }
  }
  test();