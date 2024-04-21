const express = require("express");
const {
  getAllLaunches,
  httpAddLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", httpAddLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
