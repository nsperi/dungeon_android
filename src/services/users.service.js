import Service from "./service.js";
//import userManager from "../data/fs/UserManager.js";
//import userManager from "../data/memory/UsersManager.js";
//import userManager from "../data/mongo/managers/usersManager.mongo.js";
//import dao from "../data/dao.factory.js";
import usersRepository from "../repositories/users.rep.js";

const usersService = new Service(usersRepository);
export const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = usersService;
