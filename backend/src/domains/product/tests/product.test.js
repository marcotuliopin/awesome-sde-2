process.env.PRODUCTS_FILE = require("path").resolve(__dirname, "../../../../data/products.test.json");

const fs = require("fs").promises;
const productService = require("../services/productService");

describe("ProductService", () => {
  beforeEach(async () => {
    await fs.writeFile(process.env.PRODUCTS_FILE , "[]");
  });

  test("deve criar um produto", async () => {
    const produto = {
      name: "Arroz",
      brand: "Tio João",
      quantity: 10,
      expirationDate: "2025-01-01",
    };

    const result = await productService.create(produto);

    expect(result).toHaveProperty("id");
    expect(result.name).toBe(produto.name);
    expect(result.brand).toBe(produto.brand);
    expect(result.quantity).toBe(produto.quantity);
    expect(result.expirationDate).toBe(produto.expirationDate);
  });

  test("deve retornar todos os produtos", async () => {
    await productService.create({
      name: "Feijão",
      brand: "Camil",
      quantity: 5,
      expirationDate: "2025-06-01",
    });

    const produtos = await productService.getAll();
    expect(produtos.length).toBe(1);
    expect(produtos[0].name).toBe("Feijão");
    expect(produtos[0].brand).toBe("Camil");
    expect(produtos[0].quantity).toBe(5);
    expect(produtos[0].expirationDate).toBe("2025-06-01");
  });

  test("deve atualizar um produto existente", async () => {
    const produto = await productService.create({
      name: "Macarrão",
      brand: "Adria",
      quantity: 4,
      expirationDate: "2026-01-01",
    });

    const updated = await productService.update(produto.id, {
      quantity: 99,
    });

    expect(updated.quantity).toBe(99);
  });

  test("deve lançar erro se tentar atualizar um produto inexistente", async () => {
    await expect(productService.update(9999, { name: "Novo" })).rejects.toThrow(
      "Produto não encontrado"
    );
  });
});
