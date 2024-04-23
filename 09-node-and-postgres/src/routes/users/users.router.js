const express = require("express");
const {
    httpGetUsers,
    httpGetUser,
    httpCreateUser,
    httpDeleteUser,
} = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get("/", httpGetUsers);
usersRouter.get("/:id", httpGetUser);
usersRouter.post("/", httpCreateUser);
usersRouter.delete("/:id", httpDeleteUser);

module.exports = usersRouter;
