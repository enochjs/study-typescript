// Starting with ECMAScript 2015, JavaScript has a concept of modules. TypeScript shares this concept.
// Modules are executed within their own scope, not in the global scope;
// declared in a module are not visible outside the module unless they are explicitly exported
// Modules import one another using a module loader. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it.
// In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.

/**
 * Export
 */

/**
 * Exporting a declaration
 */
//  Any declaration (such as a variable, function, class, type alias, or interface) can be exported by adding the export keyword.
export interface StringValidator {
  isAcceptable(s: string): boolean;
}

/**
 * Export statements
 */
//  Export statements are handy when exports need to be renamed for consumers, so the above example can be written as:
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && /^[a-zA-Z0-9_-]{4,16}$/.test(s);
  }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };

/**
 * Re-exports
 */
//  Often modules extend other modules, and partially expose some of their features.
// A re-export does not import it locally, or introduce a local variable.
export { ZipCodeValidator as RegExpBasedZipCodeValidator } from "./ZipCodeValidator.js";
export * from "./StringValidator.js";

/**
 * Import
 */
//  Import a single export from a module
import { ZipCodeValidator as ZipCodeValidator1 } from "./ZipCodeValidator.js";

// Import the entire module into a single variable, and use it to access the module exports
import * as validator from "./ZipCodeValidator.js";
let myValidator = new validator.ZipCodeValidator();

// Import a module for side-effects only
import "./my-module.js";

// Importing Types
import { StringValidator as StringValidator1 } from "./StringValidator.js";
// import type is always guaranteed to be removed from your JavaScript
import type { StringValidator as StringValidator2 } from "./StringValidator.js";

/**
 * Default exports
 */
//  Each module can optionally export a default export. Default exports are marked with the keyword default;
// and there can only be one default export per module. exports are imported using a different import form.
// Classes and function declarations can be authored directly as default exports.
// default exports can also be just values:
export default "123";
// default exports are really handy.
// For instance, a library like jQuery might have a default export of jQuery or $, which we’d probably also import under the name $ or jQuery.
// declare let $: JQuery;
// export default $;

/**
 * Export all as x
 */
export * as utilities from "./StringValidator.js";

/**
 * export = and import = require()
 */

/**
 * Code Generation for Modules
 */
//  Depending on the module target specified during compilation, the compiler will generate appropriate code for Node.js (CommonJS), require.js (AMD), UMD, SystemJS, or ECMAScript 2015 native modules (ES6) module-loading systems

/**
 * Simple Example
 */

/**
 * Ambient Modules
 */
/// <reference path="node.d.ts"/>
import * as URL1 from "url1";
let myUrl = URL1.parse("https://www.typescriptlang.org");

/**
 * Wildcard module declarations
 */
// declare module "*!text" {
//   const content: string;
//   export default content;
// }
// Some do it the other way around.
// declare module "json!*" {
//   const value: any;
//   export default value;
// }

/**
 * Export as close to top-level as possible
 */
