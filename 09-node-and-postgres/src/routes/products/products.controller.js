const {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
} = require("../../models/products.model");
const validateDecimal = require("../../utils/validateDecimal");

async function httpGetProducts(req, res) {
  const results = await getProducts();

  if (!results) {
    return res.status(500).json({
      message: "An unexpected error has occurred",
    });
  }
  return res.status(200).json(results);
}

async function httpGetProduct(req, res) {
  const param = Number(req.params.id);

  if (!param || isNaN(param)) {
    return res.status(400).json({
      message: "Invalid format",
    });
  }
  const result = await getProduct(param);

  if (!result) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  return res.status(200).json(result);
}

async function httpPostProduct(req, res) {
  const item = req.body;

  if (
    typeof item.product_name !== "string" ||
    item.product_name.length > 255 ||
    typeof item.price !== "number" ||
    !validateDecimal(item.price) ||
    Object.keys(item).length > 2
  ) {
    return res.status(400).json({
      message: "Invalid format",
    });
  }

  try {
    const result = await createProduct(item);
    if (!result) {
      return res.status(500).json({
        message: "Failed to create product. Please try again later.",
      });
    }
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
}

async function httpDeleteProduct(req, res) {
  const param = Number(req.params.id);

  if (!param || isNaN(param)) {
    return res.status(400).json({
      message: "Invalid format",
    });
  }
  const result = await deleteProduct(param);

  if (!result) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  return res.status(200).json(result);
}

module.exports = {
  httpGetProducts,
  httpGetProduct,
  httpPostProduct,
  httpDeleteProduct,
};
