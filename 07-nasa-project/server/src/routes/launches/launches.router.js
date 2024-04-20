const express = require("express");
const { getAllLaunches, httpAddLaunch } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", httpAddLaunch);

module.exports = launchesRouter;
