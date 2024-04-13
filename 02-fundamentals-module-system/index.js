const https = require("https");

const req = https.request("https://www.google.com", (res) => {
  // res is an event emitter
  res.on("data", (chunk) => {
    // console.log(`Data chunck: ${chunck.slice(0, 10)}...`);
  });

  res.on("end", () => {
    console.log("No more data");
  });
});

req.end();
const chunks = [];

// All of the above and be written as this for convenience without the end function
https.get("https://www.google.com", (res) => {
  res.on("data", (chunk) => {
    chunks.push(chunk);
    // console.log(`Data chunck: ${chunck.slice(0, 10)}...`);
  });

  res.on("end", () => {
    console.log("No more data");
  });
});

/* output
Data chunck: <!doctype ...
...
Data chunck: taset.ved;...
No more data
*/

setTimeout(() => {
  console.log(chunks.length);
  // 41 chunks of type <Buffer 3c 21 64 6f  ... 180 more bytes>

  const concatedBuffer = Buffer.concat(chunks);
  console.log(concatedBuffer.toString());
  // The data exactly like it would be from the console log inside the get function

  // Not how is it supposed to work but I wanted to try
}, 1000);
