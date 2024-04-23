const express = require("express");
const {
    httpGetOrders,
    httpCreateOrder,
    httpGetOrder,
    httpDeleteOrder,
} = require("./orders.controller");

const ordersRouter = express.Router();

ordersRouter.get("/", httpGetOrders);
ordersRouter.get("/:id", httpGetOrder);
ordersRouter.post("/", httpCreateOrder);
ordersRouter.delete("/:id", httpDeleteOrder);

module.exports = ordersRouter;
