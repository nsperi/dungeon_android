import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.util.js";

const persistence = argsUtil.persistence;
let dao = {};

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    const { default: userManagerMem } = await import(
      "./memory/UsersManager.js"
    );
    const { default: productManagerMem } = await import(
      "./fs/ProductManager.js"
    );
    dao = { users: userManagerMem, products: productManagerMem };
    break;
  case "fs":
    console.log("connected to file system");
    const { default: userManagerFs } = await import("./fs/UserManager.js");
    const { default: productManagerFs } = await import(
      "./fs/ProductManager.js"
    );
    dao = { users: userManagerFs, products: productManagerFs };
    break;
  default:
    console.log("connected to mongo database");
    dbConnect();
    const { default: userManagerMongo } = await import(
      "./mongo/managers/usersManager.mongo.js"
    );
    const { default: productManagerMongo } = await import(
      "./mongo/managers/productsManager.mongo.js"
    );
    dao = { users: userManagerMongo, products: productManagerMongo };
    break;
}

export default dao;
