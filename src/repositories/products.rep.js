import dao from "../data/dao.factory.js";
import ProductsDTO from "../dto/products.dto.js";

const { products } = dao;

class ProductsRepository {
  constructor(manager) {
    this.model = manager;
  }
  createRepository = async (data) => {
    try {
      data = new ProductsDTO(data);
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readRepository = async (category) => {
    try {
      const all = await this.model.read(category);
      return all;
    } catch (error) {
      throw error;
    }
  };
  paginateRepository = async ({ filter, opts }) => {
    try {
      const all = await this.model.paginate({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  };
  readOneRepository = async (pid) => {
    try {
      const one = await this.model.readOne(pid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateRepository = async (pid, data) => {
    try {
      const one = await this.model.update(pid, data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  destroyRepository = async (pid) => {
    try {
      const one = await this.model.destroy(pid);
      return one;
    } catch (error) {
      throw error;
    }
  };
}

const productsRepository = new ProductsRepository(products);
export default productsRepository;
