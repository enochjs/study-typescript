/**
 * The typeof type operator
 */
function f(s: string) {
  return { x: 10, y: 3 }
}
type P1 = ReturnType<typeof f>

// Specifically, it’s only legal to use typeof on identifiers (i.e. variable names) or their properties.
//  This helps avoid the confusing trap of writing code you think is executing, but isn’t:

// Meant to use = ReturnType<typeof f>
// let shouldContinue: typeof f("Are you sure you want to continue?");
