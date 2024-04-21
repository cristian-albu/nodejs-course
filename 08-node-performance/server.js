const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // evbent loop blocked
  }
}

app.get("/", (req, res) => {
  // Blocking real life examples
  // JSON.parse()
  // JSON.stringify()
  // array.sort()
  // crypto.pbkdf2()
  res.send(`Performance example: ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Ding ding ding: ${process.pid}`);
});

if (cluster.isMaster) {
  console.log("Master has been started...");

  const NUM_WORKERS = os.cpus().length;

  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log("Worker process started");
  app.listen(4000);
}
