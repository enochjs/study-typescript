export {};
/**
 * ECMAScript Modules in Node.js
 */
//  For the last few years, Node.js has been working to support running ECMAScript modules (ESM).
// This has been a very difficult feature to support, since the foundation of the Node.js ecosystem is built on a different module system called CommonJS (CJS).

//  Interoperating between the two module systems brings large challenges, with many new features to juggle;
// however, support for ESM in Node.js is now implemented in Node.js, and the dust has begun to settle.

// {
//   "compilerOptions": {
//       "module": "nodenext",
//   }
// }

/**
 * type in package.json and New Extensions
 */
//  Node.js supports a new setting in package.json called type. "type" can be set to either "module" or "commonjs".
// When a file is considered an ES module, a few different rules come into play compared to CommonJS
// 1. import/export statements and top-level await can be used
// 2. relative import paths need full extensions (e.g we have to write import "./foo.js" instead of import "./foo")
// 3. certain global-like values like require() and __dirname cannot be used directly
// 4. CommonJS modules get imported under certain special rules
// 5. imports might resolve differently from dependencies in node_modules

import { help } from "./help.js";

help();

/**
 * New File Extensions
 */
//  The type field in package.json is nice because it allows us to continue using the .ts and .js file extensions which can be convenient;
// however, you will occasionally need to write a file that differs from what type specifies.
// You might also just prefer to always be explicit.
// TypeScript supports two new source file extensions: .mts and .cts. When TypeScript emits these to JavaScript files, it will emit them to .mjs and .cjs respectively.
import { c_helper } from "./chelp.cjs";
import { m_helper } from "./mhelp.mjs";
c_helper();
m_helper();

/**
 * CommonJS Interop
 */
//  Node.js allows ES modules to import CommonJS modules as if they were ES modules with a default export.
// import foo = require("./help");

/**
 * package.json Exports, Imports, and Self-Referencing
 */

//  {
//   "name": "my-package",
//   "type": "module",
//   "exports": {
//       ".": {
//           // Entry-point for `import "my-package"` in ESM
//           "import": "./esm/index.js",
//           // Entry-point for `require("my-package") in CJS
//           "require": "./commonjs/index.cjs",
//       },
//   },
//   // CJS fall-back for older versions of Node.js
//   "main": "./commonjs/index.cjs",
// }
