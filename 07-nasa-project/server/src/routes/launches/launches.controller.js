const {
  launches,
  addNewLaunch,
  abortLaunchById,
  existsLaunchWithId,
} = require("../../models/launches.model");

function getAllLaunches(req, res) {
  return res.status(200).json(Array.from(launches.values()));
}

function httpAddLaunch(req, res) {
  const launch = req.body;

  if (
    typeof launch.mission !== "string" ||
    typeof launch.rocket !== "string" ||
    typeof launch.target !== "string" ||
    !(
      typeof launch.launchDate === "string" ||
      typeof launch.launchDate === "number"
    )
  ) {
    return res.status(400).json({ error: "Invalid launch request" });
  }

  const lDate = new Date(launch.launchDate);

  if (!(lDate instanceof Date) || isNaN(lDate)) {
    return res.status(400).json({ error: "Invalid launch date" });
  }

  launch.launchDate = lDate;
  addNewLaunch(launch);

  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = abortLaunchById(launchId);

  return res.status(200).json(aborted);
}

module.exports = {
  getAllLaunches,
  httpAddLaunch,
  httpAbortLaunch,
};
