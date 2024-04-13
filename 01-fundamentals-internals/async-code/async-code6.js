const { spawn } = require("child_process");

// Spawn the 'ls' command with the '-l' flag to list details of files
const ls = spawn("ls", ["-l"]);

// Listen for data events from the ls process
ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

// Listen for errors
ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

// Listen for the 'close' event
ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

/*
stdout: total 24
-rw-r--r-- 1 kod kod  359 Apr 13 07:04 async-code.js
-rw-r--r-- 1 kod kod  888 Apr 13 12:07 async-code2.js
-rw-r--r-- 1 kod kod 1159 Apr 13 12:10 async-code3.js
-rw-r--r-- 1 kod kod 1042 Apr 13 12:47 async-code4.js
-rw-r--r-- 1 kod kod  501 Apr 13 13:27 async-code5.js
-rw-r--r-- 1 kod kod  481 Apr 13 13:30 async-code6.js

*/
