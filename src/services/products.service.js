import Service from "./service.js";
import productManager from "../data/mongo/managers/productsManager.mongo.js";

const productsService = new Service(productManager);
export const { createService, readService, paginateService, readOneService, updateService, destroyService } = productsService;