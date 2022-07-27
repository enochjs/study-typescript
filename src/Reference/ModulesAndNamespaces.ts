// Using Modules
// Modules can contain both code and declarations.
// Modules also have a dependency on a module loader (such as CommonJs/Require.js) or a runtime which supports ES Modules.
// Modules provide for better code reuse, stronger isolation and better tooling support for bundling.

// Using Namespaces
// Namespaces are a TypeScript-specific way to organize code.
// Namespaces are simply named JavaScript objects in the global namespace.
// This makes namespaces a very simple construct to use. Unlike modules,
// they can span multiple files, and can be concatenated using outFile.

/**
 * Pitfalls of Namespaces and Modules
 */
// /// <reference> -ing a module
// A common mistake is to try to use the /// <reference ... /> syntax to refer to a module file, rather than using an import statement
