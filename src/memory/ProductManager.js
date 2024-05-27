class ProductManager {
  static #products = [];
  create(data) {
      try {
          const product = {
              id:
                  ProductManager.#products.length === 0
                  ? 1
                  : ProductManager.#products[ProductManager.#products.length -1].id + 1,
              title : data.title,
              photo : data.photo,
              category : data.category,
              price : data.price,
              stock : data.stock
          };
          ProductManager.#products.push(product);
          console.log('Producto creado');
      } catch (error) {
          console.error('Error al crear el producto:', error);
      }
  }
  read(){
      try{
          if(ProductManager.#products.length === 0) {
              throw new Error("No hay productos");
          }else{
              return ProductManager.#products;
          }
      }catch(error){
          console.log(error);
      }
  }
  readOne(id){
      try{
          const one = ProductManager.#products.find((each) => each.id === id);
          if(!one) {
              throw new Error ("Producto inexistente");
              }else{
                  return one;
              }
          }catch(error){
              console.log(error)
      }
  }
  destroy(id){
      try{
          this.readOne(id);
          const within = ProductManager.#products.filter((each) => each.id !== id);
          ProductManager.#products = within;
          console.log("Producto eliminado");
      }catch(error){
          console.log(error);
      }
  }
}

const productsManager = new ProductManager();

productsManager.create({
  title: "comic 1",
  photo: "comic.pdf",
  category: "comics",
  price: 4000,
  stock: 200,
});

productsManager.create({
  title: "comic 2",
  photo: "comic.pdf",
  category: "comics",
  price: 5000,
  stock: 400,
});

console.log(productsManager.read());
console.log(productsManager.read());
console.log(productsManager.readOne(2));
productsManager.destroy(3)
