const Router = require("express").Router();
const ProductService = require("../services/productService");
const httpsStatusCodes = require("../../../utils/constants/httpStatusCodes");

Router.post("/", async (req, res, next) => {
  try {
    const product = await ProductService.create(req.body);
    res.status(httpsStatusCodes.ACCEPTED).send(product);
  } catch (error) {
    next(error);
  }
});

Router.put("/:id", async (req, res, next) => {
    try {
    await ProductService.update(req.params.id, req.body);
    res.status(httpsStatusCodes.ACCEPTED).json({
        message: "Produto atualizado com sucesso",
    });
    } catch (error) {
    next(error);
    }
});

Router.get("/", async (req, res, next) => {
  try {
    all_products = await ProductService.getAll();
    res.status(httpsStatusCodes.ACCEPTED).send(all_products);
  } catch (error) {
    next(error);
  }
});

module.exports = Router;
