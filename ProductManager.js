// Clase "ProductManager" con su constructor con el elemento products, el cual es un arreglo vacío
class ProductManager {
  constructor() {
    this.products = [];
    this.lastProductId = 0;
  }

  addProduct(product) {
    if (!this.validateProductFields(product)) {
      throw new Error('All fields are mandatory.');
    }

    if (this.isCodeDuplicate(product.code)) {
      throw new Error('Product with the same code already exists.');
    }

    this.lastProductId++;
    product.id = this.lastProductId;
    this.products.push(product);
  }

  validateProductFields(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    );
  }

  isCodeDuplicate(code) {
    return this.products.some((product) => product.code === code);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Not found');
    }
    return product;
  }
}

//Ejemplo de uso:
const productManager = new ProductManager();
productManager.addProduct({
  title: 'Product 1',
  description: 'Description of product 1',
  price: 19.99,
  thumbnail: 'path/to/image.jpg',
  code: '12345',
  stock: 100,
});

const allProducts = productManager.getProducts();
console.log(allProducts);

const productById = productManager.getProductById(1);
console.log(productById);

module.exports = ProductManager;

