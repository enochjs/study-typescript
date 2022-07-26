export {};
/**
 * Introduction
 */
//  “declaration merging” means that the compiler merges two separate declarations
// declared with the same name into a single definition.

/**
 * Basic Concepts
 */
//  a declaration creates entities in at least one of three groups: namespace, type, or value.
// 1. namespace
// Namespace-creating declarations create a namespace, which contains names that are accessed using a dotted notation.
// 2. type
// Type-creating declarations do just that: they create a type that is visible with the declared shape and bound to the given name
// value
// value-creating declarations create values that are visible in the output JavaScript.

/**
 * Merging Interfaces
 */
//  Non-function members of the interfaces should be unique. If they are not unique, they must be of the same type.
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
let box: Box = { height: 5, width: 6, scale: 10 };

// For function members, each function member of the same name is treated as describing an overload of the same function
// Notice that the elements of each group maintains the same order,
// but the groups themselves are merged with later overload sets ordered first.
interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// equal
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}

/**
 * Merging Namespaces
 */
//  Similarly to interfaces, namespaces of the same name will also merge their members.
namespace Animals {
  export class Zebra {}
}
namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog {}
}

// equal
// namespace Animals {
//   export interface Legged {
//     numberOfLegs: number;
//   }
//   export class Zebra {}
//   export class Dog {}
// }

// Non-exported members are only visible in the original (un-merged) namespace.
// This means that after merging, merged members that came from other declarations cannot see non-exported members.
namespace Animal {
  let haveMuscles = true;
  export function animalsHaveMuscles() {
    return haveMuscles;
  }
}
namespace Animal {
  export function doAnimalsHaveMuscles() {
    // return haveMuscles; // Error, because haveMuscles is not accessible here
  }
}

/**
 * Merging Namespaces with Classes, Functions, and Enums
 */
class Album {
  label: Album.AlbumLabel;
}
namespace Album {
  export class AlbumLabel {}
}

function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}
console.log(buildLabel("Sam Smith"));

enum Color {
  red = 1,
  green = 2,
  blue = 4,
}
namespace Color {
  export function mixColor(colorName: string) {
    if (colorName == "yellow") {
      return Color.red + Color.green;
    } else if (colorName == "white") {
      return Color.red + Color.green + Color.blue;
    } else if (colorName == "magenta") {
      return Color.red + Color.blue;
    } else if (colorName == "cyan") {
      return Color.green + Color.blue;
    }
  }
}

/**
 * Module Augmentation
 */
