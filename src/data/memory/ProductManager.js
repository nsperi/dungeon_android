class ProductsManager {
	static #products = []
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
        ProductsManager.#products = ProductsManager.#products.filter((each) => each.id !== id);
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const productManager = new ProductsManager();
export default productManager;
