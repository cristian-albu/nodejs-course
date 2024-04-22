const express = require("express");
const {
  httpGetProducts,
  httpPostProduct,
  httpGetProduct,
  httpDeleteProduct,
} = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get("/", httpGetProducts);
productsRouter.get("/:id", httpGetProduct);
productsRouter.post("/", httpPostProduct);
productsRouter.delete("/:id", httpDeleteProduct);

module.exports = productsRouter;
