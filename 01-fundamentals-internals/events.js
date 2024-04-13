const EventEmitter = require("events");

const myEmitter = new EventEmitter();

// Subscribe to an event - Observer 1
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

// Subscribe to an event - Observer 2
myEmitter.on("newSale", (arg) => {
  console.log(arg);
});

// Emit the event
myEmitter.emit("newSale", "argument");
