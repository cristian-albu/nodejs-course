const { type } = require("os");

// code parsed by the engine pseudo code
const code = `
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
`;

// Lexical Analysis and Syntax Parsing (Tokenization)

function tokenizer(code) {
  const tokens = code.split(/\s+|\b/).filter((token) => token.trim() !== "");

  return tokens;
}

const tokens = tokenizer(code);
/* output >> [
  'const', 'variable', '=',         '5',       ';',
  'const', 'list',     '=',         '[',       '1',
  ',',     '2',        ',',         '3',       ',',
  '4',     ',',        '5',         '];',      'function',
  'foo',   '()',       '{',         'const',   'variables',
  '=',     '20',       ';',         'console', '.',
  'log',   '(',        'variables', ');',      '}',
  'for',   '(',        'let',       'i',       '=',
  '0',     ';',        'i',         '<',       'list',
  '.',     'length',   ';',         'i',       '++)',
  '{',     'console',  '.',         'log',     '(',
  'list',  '[',        'i',         ']);',     '}',
  'foo',   '();'
] */

// Abstract Syntax Tree (AST) Generation
function astGeneration(tokens) {
  // some magic happens here
  return {
    type: "Program",
    body: [
      {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "variable" },
            init: { type: "Literal", value: 5 },
          },
        ],
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
                { type: "Literal", value: 5 },
              ],
            },
          },
        ],
      },
    ],
  };
}

const AST = astGeneration(tokens);

function buildCallStack(AST) {
  // very simplified pseudocode for visualization
  const callStack = [
    {
      function: "foo",
      arguments: [],
      locals: ["variables"],
      address: 0x7fff5fbffda0,
    },
  ];

  return callStack;
}

function buildMemoryHeap(AST) {
  // very simplified pseudocode for visualization
  const memoryHeap = {
    global: {
      variable: { address: 0x7fff5fbffd90, size: 1, value: 5 },
      list: { address: 0x7fff5fbffd98, size: 10, values: [1, 2, 3, 4, 5] },
      foo: {
        address: 0x7fff5fbffda0,
        size: 1,
        value: {
          variables: { address: 0x7fff5fbffda8, size: 1, value: 20 },
          console: {
            address: 0x7fff5fbffdb0,
            size: 1,
            value: {
              log: { address: 0x7fff5fbffdb8, size: 1, value: "function log" },
            },
          },
        },
      },
    },
  };

  return memoryHeap;
}

function garbageCollector(memoryHeap, callStack) {
  // some magic happens here
}

function interpreterOrCompiler(AST) {
  // some magic happens here
  const memoryHeap = buildMemoryHeap(AST);
  const callStack = buildCallStack(AST);

  callStack.forEach((e) => {
    e.function(e.arguments);
  });

  garbageCollector(memoryHeap, callStack);
}

interpreterOrCompiler(AST);
