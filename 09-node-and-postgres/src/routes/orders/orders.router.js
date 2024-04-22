const express = require("express");
const { httpGetOrders } = require("./orders.controller");

const ordersRouter = express.Router();

ordersRouter.get("/", httpGetOrders);

module.exports = ordersRouter;
