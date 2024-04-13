function movePlayer(distance, callback) {
  console.log(`Player moved with callback ${distance} meters`);
  callback();
}
movePlayer(100, () => {
  movePlayer(200, () => {
    movePlayer(300, () => {
      movePlayer(400, () => {});
    });
  });
});

function movePlayer2(distance) {
  return new Promise((resolve, reject) => {
    console.log(`Player moved ${distance} meters`);
    resolve();
  });
}

movePlayer2(1000)
  .then(() => movePlayer2(2000))
  .then(() => movePlayer2(3000))
  .then(() => movePlayer2(4000));

async function playerStart() {
  await movePlayer2(100);
  await movePlayer2(200);
  await movePlayer2(300);
  await movePlayer2(400);
}

playerStart();

/* OUTPUT
Player moved 1000 meters
Player moved 100 meters
Player moved 2000 meters
Player moved 200 meters
Player moved 300 meters
Player moved 400 meters
Player moved 3000 meters
Player moved 4000 meters

*/
