const express = require("express");
const usersRouter = require("./routes/users/users.router");
const ordersRouter = require("./routes/orders/orders.router");
const productsRouter = require("./routes/products/products.router");

const app = express();

app.use(express.json());

app.use("/orders", ordersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

module.exports = app;
