const createOrder = require("../../models/orders.model/createOrder");
const deleteOrder = require("../../models/orders.model/deleteOrder");
const getOrder = require("../../models/orders.model/getOrder");
const getOrders = require("../../models/orders.model/getOrders");

async function httpGetOrders(_req, res) {
    try {
        const results = await getOrders();

        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}

async function httpGetOrder(req, res) {
    try {
        const id = req.params.id;

        const result = await getOrder(id);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}

async function httpDeleteOrder(req, res) {
    try {
        const id = req.params.id;

        const result = await deleteOrder(id);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}

async function httpCreateOrder(req, res) {
    const body = req.body;

    const { user_id, products } = body;

    if (
        !user_id ||
        isNaN(user_id) ||
        !Array.isArray(products) ||
        products.length < 1 ||
        Object.keys(body).length > 2
    ) {
        return res.status(400).json({ message: "Invalid request body" });
    }

    for (const product of products) {
        const { product_id, product_name, price, quantity } = product;
        if (
            isNaN(product_id) ||
            typeof product_name !== "string" ||
            product_name.length > 255 ||
            isNaN(price) ||
            isNaN(quantity) ||
            Object.keys(product).length > 4
        ) {
            return res.status(400).json({
                message:
                    "Invalid request body. Wrong type of product in product list",
            });
        }
    }

    try {
        const order_id = await createOrder({ user_id, products });
        return res
            .status(201)
            .json({ message: `Order created. Order id: ${order_id}` });
    } catch (error) {
        return res.status(500).json({ message: error.detail });
    }
}

module.exports = {
    httpGetOrder,
    httpGetOrders,
    httpCreateOrder,
    httpDeleteOrder,
};
