import "../utils/env.util.js";
import dbConnect from "../utils/dbConnect.util.js";
import { faker } from "@faker-js/faker";
import usersRepository from "../repositories/users.rep.js";

async function createData() {
  try {
    dbConnect();
    for (let i = 1; i < 20; i++) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        photo: faker.image.avatar(),
      };
      await usersRepository.createRepository(user);
    }
    console.log("USERS CREATED");
  } catch (error) {
    console.log(error);
  }
}

createData();
