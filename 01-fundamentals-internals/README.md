# NodeJs

Node.js is an open-source, cross-platform JavaScript runtime environment built on Chrome's V8 JavaScript engine. It utilizes an event-driven, non-blocking I/O model, making it efficient for handling concurrent operations.

![node internals](/01-fundamentals-internals/assets/node_diagram.jpg)

### Js Engine

The js engine is the part of node that is able to execute the js code. The js engine is able to execute the js code in the following way:

Simplified example of code:

```js
const variable = 5;
const list = [1, 2, 3, 4, 5];

function foo() {
  const variables = 20;
  console.log(variables);
}

for (let i = 0; i < list.length; i++) {
  console.log(list[i]);
}

foo();
```

- **Lexical Analysis and Tokenization**:

  - The JavaScript engine begins by parsing the code character by character.
  - It identifies meaningful tokens such as keywords (`const`, `function`, `for`), identifiers (`variable`, `list`, `foo`, `i`), operators (`=`, `<`, `++`), and literals (`5`, `[1, 2, 3, 4, 5]`).
  - These tokens are then organized into a sequence, filtering out any whitespace or unnecessary characters.

- **Syntax Parsing and Abstract Syntax Tree (AST) Creation**:

  - Using the tokens generated in the previous step, the engine constructs an Abstract Syntax Tree (AST), representing the grammatical structure of the code.
  - The AST organizes tokens into nodes that represent expressions, statements, declarations, and other syntactic constructs.

  ```js
  const ast = {
  type: "Program",
  body: [
   {
     type: "VariableDeclaration",
     kind: "const",
     declarations: [
       {
         type: "VariableDeclarator",
         id: { type: "Identifier", name: "variable" },
         init: { type: "Literal", value: 5 }
       }
     ]
   },
   {
     type: "VariableDeclaration",
     kind: "const",
     declarations: [
       {
         type: "VariableDeclarator",
         id: { type: "Identifier", name: "list" },
         init: {
           type: "ArrayExpression",
           elements: [
             { type: "Literal", value: 1 },
             { type: "Literal", value: 2 },
             { type: "Literal", value: 3 },
             { type: "Literal", value: 4 },
             { type: "Literal", value: 5 }
           ]
         }
       }
     ]
   },
   ...
   }
  ```

- **Scope Analysis**:

  - The engine analyzes the code to determine the scope of each variable and function declaration.
  - It tracks variable declarations and function declarations within each scope.

  ```
  Global Scope
  ├── variable (const)
  ├── list (const)
  └── foo (function)
          └── variables (const)
  ```

- **Variable Initialization**:

  - The engine initializes memory space for variables declared using `const` or `let` and assigns them an initial value if provided.
  - In your code, memory space would be allocated for `variable` and `list`.

- **Function Declaration**:

  - The engine recognizes function declarations (`function foo() {...}`) and assigns them to memory.
  - In your code, the `foo` function is recognized and stored in memory.

- **Execution**:

  - The engine executes the code line by line, following the control flow.
  - In your code:
    - The `for` loop is encountered and executed. It iterates over the `list` array and logs each element to the console.
    - The `foo()` function is called. Within the function:
      - A new scope is created.
      - The `variables` constant is initialized and assigned a value of `20`.
      - `console.log(variables)` is executed, logging `20` to the console.
    - Execution returns to the global scope.

- **Memory Management**:
  - Throughout the execution process, the engine manages memory allocation and deallocation for variables, objects, and functions.
  - It may use techniques such as garbage collection to reclaim memory occupied by objects that are no longer in use.

### Async code

```js
setTimeout(() => {
  console.log("timer code");
}, 100);

console.log("sync code");

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("promise resolved");
  }, 100);
}).then((data) => {
  console.log(data);
});

setImmediate(() => {
  console.log("immediate code");
});

// process.nextTick is a special case, it is executed before the event loop
process.nextTick(() => {
  console.log("next tick code");
});

/* Output
>> sync code
>> next tick code
>> immediate code
>> timer code
>> promise resolved
*/
```

The setTimeout, setImmediate and process.nextTick are not part of the javascript engine. They are part of the nodejs api.

Nodejs has a binding to the c++ code that is able to handle the async code.
The bindings connect to libuv, which is a library that handles async code.

The libuv library is able to handle async codeby using the event loop.

### Event loop

The event loop is part of the libuv library in the case of node. In the case of the browser, the event loop is part of the browser.

The event loop is a loop that checks if there are any async code that needs to be executed.

Node is single-threaded, but it uses the libuv to use multiple threads for async code. This happens because libuv is able to use the thread pool. Only some operations are handled by the thread pool, like file system operations. When the async code is ready to be executed, it is sent to the event loop.

### Event loop phases

1. timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
2. pending callbacks: executes I/O callbacks deferred to the next loop iteration.
3. idle, prepare: only used internally.
4. poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
5. check: setImmediate() callbacks are invoked here.
6. close callbacks: some close callbacks, e.g. socket.on('close', ...).

Pseudo code of the event loop:

```js
// Define an object to represent the event queue
const eventQueue = {
  events: [],

  // Method to add events to the queue
  addEvent: function (event) {
    this.events.push(event);
  },

  // Method to retrieve the next event from the queue
  getNextEvent: function () {
    return this.events.shift();
  },

  // Method to check if the event queue is empty
  isEmpty: function () {
    return this.events.length === 0;
  },
};

// Simulate adding some events to the queue
eventQueue.addEvent({
  type: "timer",
  callback: () => console.log("Timer event occurred"),
});
eventQueue.addEvent({
  type: "io",
  callback: () => console.log("I/O event occurred"),
});

// Simulate the event loop
while (true) {
  const event = eventQueue.getNextEvent();

  if (event) {
    // Process the event
    switch (event.type) {
      case "timer":
        event.callback();
        break;
      case "io":
        event.callback();
        break;
    }
  }

  // Check if the event queue is empty and if the program should exit
  if (eventQueue.isEmpty()) {
    if (shouldExit()) {
      break;
    }
  }
}

// Function to simulate exit conditions
function shouldExit() {
  // Simulated exit condition
  return true;
}
```

![js internals](/01-fundamentals-internals/assets/js_internals.gif)

Microtasks (promises) will be executed before macrotasks (callbacks)

### Event emitter

The event emitter is a class that is able to emit events. It is used by the nodejs api to emit events. This follows the observer pattern.

```js
const EventEmitter = require("events");

const myEmitter = new EventEmitter();

// Subscribe to an event
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

// Emit the event
myEmitter.emit("newSale");
```

An example of the event emitter is the http module. The http module is able to emit events like request and response.

```js
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  res.end("Request received");
});

server.listen(8000, "localhost", () => {
  console.log("Server is listening on port 8000");
});
```

### Threads

NodeJs is single threaded but it communicates via the libuv to assign tasks to a thread pool. So Node can't directly work with threads but it can create the event queue and assign libuv to take over via c++. This is why it is defined as "event-driven, non-blocking I/O model, making it efficient for handling concurrent operations."

![node internals](/01-fundamentals-internals/assets/node_internals2.png)

Concurrency
(Single-core CPU)
th1 | ...
... | th2
th1 | ...
... | th2

Simple example: 1 person is eating. He's got 1 mouth but 2 hands. He can grab multiple things to it but can eat one at a time.

Concurrency + parallelism
(Multi-Core CPU)

th1 | th2
... | th2
th1 | ...
th1 | th2

Simple example: 2 personas are eating. They got 2 mouths and 4 hands. Theu can grab multiple things and eat them at the same.time.

![cores and threads](/01-fundamentals-internals/assets/cores_and_threads.jpg)

For example AMD Ryzen 7 7800X3D has 8 cores and 16 threads. CPU's have between 1-2 threads per core.

AMD Ryzen Threadripper PRO 7995 has 96 cores with 192 threads.

**Real life thread use.**

It's a common misconception that browsers like Chrome operate on a one-tab-per-thread model. While it's true that each tab in Chrome typically runs its own process, these processes are not strictly bound to individual threads. Instead, each tab process manages multiple threads to handle various tasks such as rendering, JavaScript execution, networking, and more.

In Chrome's multi-process architecture, each tab process typically consists of multiple threads responsible for different tasks. For instance, there may be separate threads for handling user input, rendering content, executing JavaScript, managing network requests, and so on. This multi-threaded approach allows Chrome to handle multiple tabs efficiently, even on systems with a limited number of CPU cores.
