import Service from "./service.js";
import authRepository from "../repositories/auth.rep.js";
const authService = new Service(authRepository);

export const {
  createService,
  readService,
  readByIdService,
  readByEmailService,
  updateService,
  destroyService,
} = authService;
