function promisify(item, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(item);
    }, delay);
  });
}

const a = () => promisify("a", 100);
const b = () => promisify("b", 5000);
const c = () => promisify("c", 3000);

async function parallel() {
  const promises = [a(), b(), c()];

  const [output1, output2, output3] = await Promise.all(promises);

  return `parallel is done: ${output1}, ${output2}, ${output3}`;
}

async function race() {
  const promises = [a(), b(), c()];
  const output = await Promise.race(promises);

  return `race is finished: ${output}`;
}

async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();

  return `sequence is done: ${output1}, ${output2}, ${output3}`;
}

parallel().then(console.log); // all at the same time (speed determined by the slowest) 5000ms
race().then(console.log); // will bring 1 value (speed of the fastest) 100 ms
sequence().then(console.log); // all but in sequence (sum of all speeds) 8100 ms
