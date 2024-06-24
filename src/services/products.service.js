import Service from "./service.js";
//import productManager from "../data/fs/ProductManager.js";
//import productManager from "../data/memory/ProductManager.js";
//import productManager from "../data/mongo/managers/productsManager.mongo.js";
import dao from "../data/dao.factory.js";

const { products } = dao;

const productsService = new Service(products);
export const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = productsService;
