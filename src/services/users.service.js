import Service from "./service.js";
import userManager from "../data/mongo/managers/usersManager.mongo.js";

const usersService = new Service(userManager);
export const { createService, readService, paginateService, readOneService, updateService, destroyService } = usersService;