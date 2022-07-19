function padLeftSum(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
// Within our if check,
// TypeScript sees typeof padding === "number" and understands that as a special form of code called a type guard.
// TypeScript follows possible paths of execution
// that our programs can take to analyze the most specific possible type of a value at a given position.
// It looks at these special checks (called type guards) and assignments,
// and the process of refining types to more specific types than declared is called narrowing.
// In many editors we can observe these types as they change, and we’ll even do so in our examples.

/**
 * typeof type guards
 */
// "string" "number" "bigint" "boolean" "symbol" "undefined" "object" "function"
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

/**
 * Truthiness narrowing
 */
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

/**
 * Equality narrowing
 */
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
    y.toLowerCase();
  } else {
    console.log(x);
  }
}

/**
 * The in operator narrowing
 * JavaScript has an operator for determining if an object has a property with a name
 */

type NFish = { swim: () => void };
type NBird = { fly: () => void };

function move(animal: NFish | NBird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}

/**
 * instanceof narrowing
 */
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

/**
 * Assignments
 */
let x1 = Math.random() < 0.5 ? 10 : "hello world!";
x1 = 1;
x1 = "goodbye!";
// x1 = true

/**
 * Control flow analysis
 */
function padLeftControl(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  // auto assignment to string
  return padding + input;
}

/**
 * Using type predicates
 * @param pet
 * @returns
 */
type NPFish = { swim: () => void; name?: string };
type NPBird = { fly: () => void };

function getSmallPet(): NPBird | NPFish {
  return Math.random() > 0.5
    ? { swim: () => {}, name: "String" }
    : { fly: () => {} };
}

function isFish(pet: NPFish | NPBird): pet is NPFish {
  return (pet as NPFish).swim !== undefined;
}
let pet = getSmallPet();
if (isFish(pet)) {
  pet.swim(); // pet is NPFish
} else {
  pet.fly();
}

/**
 * Discriminated unions
 */
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type TShape = Circle | Square;

function getArea(shape: TShape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
}

/**
 * The never type
 */
//  When narrowing, you can reduce the options of a union to a point
// where you have removed all possibilities and have nothing left.
// In those cases, TypeScript will use a never type to represent a state which shouldn’t exist.

/**
 * Exhaustiveness checking
 */
type Shape1 = Circle | Square;

function getArea1(shape: Shape1) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape2 = Circle | Square | Triangle;

function getArea2(shape: Shape2) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    // default:
    //   const _exhaustiveCheck: never = shape;
    //   return _exhaustiveCheck;
  }
}
export {};

// 总结
// narrowing 方式
// typeof Truthiness Equality in instanceof type_predicates Discriminated_unions
// pet is NPFish, 代替 boolean
