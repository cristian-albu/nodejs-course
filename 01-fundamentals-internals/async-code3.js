const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello");
  }, 0);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("is it me you are looking for?");
  }, 0);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("I can see it in your eyes");
  }, 0);
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

// -----------------------------

const urls = [
  "https://api.chess.com/pub/player/cristianalb",
  "https://api.chess.com/pub/player/levyrozman",
  "https://api.chess.com/pub/player/hikaru",
];

Promise.all(
  urls.map((url) => {
    return fetch(url).then((resp) => resp.json());
  })
)
  .then((res) => {
    console.log(res[0]);
    console.log(res[1]);
    console.log(res[2]);
  })
  .catch(() => console.log("error"));
