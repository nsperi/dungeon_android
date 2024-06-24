import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./src/data/fs/files/users.json";
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
      if ((!data.name, !data.email, !data.password)) {
        throw new Error("Ingrese todos los datos");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
          password: data.password,
          role: 0,
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(user);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        console.log({ created: user.id });
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async read(role) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      role && (all = all.filter((each) => each.role === role));
      return all;
    } catch (error) {
      console.log(error);
    }
  }

  async paginate({ page = 1, limit = 10, role }) {
    try {
      let all = await this.read(role);
      const total = all.length;
      const start = (page - 1) * limit;
      const end = page * limit;
      const paginatedItems = all.slice(start, end);
      const totalPages = Math.ceil(total / limit);
      return {
        total,
        page,
        totalPages,
        limit,
        items: paginatedItems,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let user = all.find((each) => each.id === id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      } else {
        console.log(user);
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readByEmail(email) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let user = all.find((each) => each.email === email);
      return user;
    } catch (error) {
      console.log(error);
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
      let user = all.find((each) => each.id === id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log({ deleted: user.id });
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const userManager = new UserManager();
export default userManager;

// async function test() {
//     try {
//       const users = new UserManager();
//       await users.create({
//         name: "Naty",
//         photo: "photo.png",
//         email: "nsperipolli@gmail.com",
//         password: "abc123",
//     });
//       await users.create({
//         name: "Pepi",
//         photo: "photo.png",
//         email: "pepi@gmail.com",
//         password: "abc123",
//       });
//       await users.read();
//       //await users.readOne("eb2c7b38869b298053cf752d");
//       //await users.destroy("eb2c7b38869b298053cf752d");
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   test();
