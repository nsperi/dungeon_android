import "../utils/env.util.js";
import dbConnect from "../utils/dbConnect.util.js";
import { faker } from "@faker-js/faker";
import productsRepository from "../repositories/products.rep.js";

async function createData() {
  try {
    dbConnect();
    for (let i = 1; i < 1000; i++) {
      const product = {
        title: faker.commerce.productName(),
        photo: faker.image.avatar(),
        price: faker.number.float(),
        stock: faker.number.int(),
      };
      await productsRepository.createRepository(product);
    }
    console.log("PRODUCTS CREATED");
  } catch (error) {
    console.log(error);
  }
}

createData();
