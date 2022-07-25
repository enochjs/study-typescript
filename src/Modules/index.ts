/**
 * How JavaScript Modules are Defined
 */
// In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.
// Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).
// Modules are executed within their own scope, not in the global scope.
// This means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms.
// Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.

/**
 * Non-modules
 */
//  If you have a file that doesn’t currently have any imports or exports, but you want to be treated as a module, add the line:
export {}

/**
 * Modules in TypeScript
 */
//  ES Module Syntax
// export default
export default function helloWorld() {
  console.log('Hello, world!')
}

// export
export var pi = 3.14
export let squareTwo = 1.41
export const phi = 1.61

export class RandomNumberGenerator {}

export function absolute(num: number) {
  if (num < 0) return num * -1
  return num
}

// Import Syntax
// import
// import { pi, phi, absolute } from './maths.js'
// import as
// import { pi as π } from "./maths.js";
// mix
// import RandomNumberGenerator, { pi as π } from "./maths.js";

// You can take all of the exported objects and put them into a single namespace using * as name:
// import * as math from "./maths.js";

// You can import a file and not include any variables into your current module via import "./file":
// import "./maths.js";

/**
 * TypeScript Specific ES Module Syntax
 */
// export type Cat = { breed: string; yearOfBirth: number };

// export interface Dog {
//   breeds: string[];
//   yearOfBirth: number;
// }

// // @filename: app.ts
// import { Cat, Dog } from "./animal.js";
// type Animals = Cat | Dog;

/**
 * ES Module Syntax with CommonJS Behavior
 */
//  TypeScript has ES Module syntax which directly correlates to a CommonJS and AMD require.
// Imports using ES Module are for most cases the same as the require from those environments,
// but this syntax ensures you have a 1 to 1 match in your TypeScript file with the CommonJS output:
import fs = require('fs')
const code = fs.readFileSync('hello.ts', 'utf8')

/**
 * CommonJS Syntax
 */
// Exporting
// Identifiers are exported via setting the exports property on a global called module.

function absolute1(num: number) {
  if (num < 0) return num * -1
  return num
}

module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute1,
}

// Then these files can be imported via a require statement:
// const maths = require('maths')
// const { squareTwo } = require('maths')

/**
 * CommonJS and ES Modules interop
 */
//  There is a mis-match in features between CommonJS and ES Modules regarding the distinction between a default import and a module namespace object import.
// TypeScript has a compiler flag to reduce the friction between the two different sets of constraints with esModuleInterop.
// Enabling esModuleInterop will also enable allowSyntheticDefaultImports.

/**
 * TypeScript’s Module Resolution Options
 */

/**
 * TypeScript’s Module Output Options
 */
//  target which determines which JS features are downleveled (converted to run in older JavaScript runtimes) and which are left intact
// Which target you use is determined by the features available in the JavaScript runtime you expect to run the TypeScript code in.
// That could be: the oldest web browser you support, the lowest version of Node.js you expect to run on or could come from unique constraints from your runtime

// module which determines what code is used for modules to interact with each other
// All communication between modules happens via a module loader, the compiler option module determines which one is used.
// At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it.

/**
 * TypeScript namespaces
 */
//  TypeScript has its own module format called namespaces which pre-dates the ES Modules standard.
// This syntax has a lot of useful features for creating complex definition files, and still sees active use in DefinitelyTyped.
// While not deprecated, the majority of the features in namespaces exist in ES Modules and we recommend you use that to align with JavaScript’s direction.
// You can learn more about namespaces in the namespaces reference page.
