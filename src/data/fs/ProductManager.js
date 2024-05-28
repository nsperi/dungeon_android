import fs from 'fs';
import crypto from 'crypto';

class ProductManager {
  constructor() {
    this.path = "./src/data/fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
        const stringData = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, stringData);
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

  async read(cat) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      cat && (all = all.filter(each => each.category === cat))
      return all;
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let product = all.find((each) => each.id === id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      } else {
        const error = new Error("Not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
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
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const productManager = new ProductManager()
export default productManager

// async function test() {
//     try {
//       const products = new ProductManager();
//       await products.create({ 
//         title: "comic 1",
//         photo: "comic.pdf",
//         category: "comics",
//         price: 4000,
//         stock: 200,
//     });
//       await products.create({
//         title: "comic 2",
//         photo: "comic.pdf",
//         category: "comics",
//         price: 5000,
//         stock: 400,
//       });
//       await products.read();
//       //await products.readOne("eb2c7b38869b298053cf752d");
//       //await products.destroy("eb2c7b38869b298053cf752d");
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   test();