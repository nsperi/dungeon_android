class ProductsManager {
  static #products = [];
  async create(data) {
    try {
      if (!data.title || !data.description) {
        throw new Error("Ingresar descripción del producto");
      } else {
        ProductsManager.#products.push(data);
        return data;
      }
    } catch (error) {
      throw error;
    }
  }
  async read(filter) {
    try {
      return ProductsManager.#products;
    } catch (error) {
      throw error;
    }
  }

  async paginate({ page = 1, limit = 10, category }) {
    try {
      let all = await this.read(category);
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
      let one = ProductsManager.#products.find((each) => each.id === id);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      let one = ProductsManager.#products.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      let one = ProductsManager.#products.find((each) => each.id === id);
      if (one) {
        ProductsManager.#products = ProductsManager.#products.filter(
          (each) => each.id !== id
        );
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const productManager = new ProductsManager();
export default productManager;
