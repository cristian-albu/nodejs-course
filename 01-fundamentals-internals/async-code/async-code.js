setTimeout(() => {
  console.log("async code");
}, 100);

setTimeout(() => {
  console.log("async code 2");
}, 0);

console.log("sync code");

const promise = Promise.resolve("promise resolved").then((data) => {
  console.log(data);
});

setImmediate(() => {
  console.log("immediate code");
});

process.nextTick(() => {
  console.log("next tick code");
});
