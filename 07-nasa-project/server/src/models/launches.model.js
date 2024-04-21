const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getNewFlightNumber() {
  const arr = Array.from(launches.values());
  const lastFlightNumber = arr[arr.length - 1].flightNumber;
  return lastFlightNumber + 1;
}

function addNewLaunch(launch) {
  const flightNumber = getNewFlightNumber();
  launches.set(
    flightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["ZTM", "NASA"],
      flightNumber,
    })
  );
}

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

module.exports = {
  launches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
