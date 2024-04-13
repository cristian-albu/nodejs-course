const promiseOne = new Promise((res, rej) => {
  setTimeout(res, 3000);
});

const promiseTwo = new Promise((res, rej) => {
  setTimeout(rej, 3000);
});

Promise.all([promiseOne, promiseTwo])
  .then((data) => console.log(data))
  .catch((e) => console.log("Something failed", e));

Promise.allSettled([promiseOne, promiseTwo]).then((data) => console.log(data));

/* Output
[
    { status: 'fulfilled', value: undefined },
    { status: 'rejected', reason: undefined }
]
Something failed undefined
*/
