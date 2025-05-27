const fs = require("fs").promises;
const path = require("path");
const QueryError = require("../../../../errors/QueryError");

const PRODUCTS_FILE = path.resolve(__dirname, "../../../../data/products.json");

class ProductService {
  async _readProducts() {
    try {
      const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async _writeProducts(products) {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  }

  async create(body) {
    if (!body.name || !body.brand || !body.quantity || !body.expirationDate) {
      throw new QueryError("Todos os campos são obrigatórios");
    }

    const products = await this._readProducts();

    const newProduct = {
      id: Date.now(),
      name: body.name,
      brand: body.brand,
      quantity: body.quantity,
      expirationDate: body.expirationDate,
    };

    products.push(newProduct);
    await this._writeProducts(products);

    return newProduct;
  }

  async getAll() {
    return await this._readProducts();
  }

  async getByName(name) {
    const products = await this._readProducts();
    return products.filter((product) => product.name === name);
  }

  async update(id, body) {
    const products = await this._readProducts();
    const index = products.findIndex((p) => p.id === Number(id));

    if (index === -1) {
      throw new QueryError("Produto não encontrado");
    }

    products[index] = { ...products[index], ...body };
    await this._writeProducts(products);
    return products[index];
  }
}

module.exports = new ProductService();
