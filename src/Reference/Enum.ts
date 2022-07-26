// Enums allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases.
// TypeScript provides both numeric and string-based enums.

/**
 * Numeric enums
 */
//  we have a numeric enum where Up is initialized with 1. All of the following members are auto-incremented from that point on.
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

enum UserResponse {
  No = 0,
  Yes = 1,
}
// enums without initializers either need to be first, or have to come after numeric enums initialized with numeric constants or other constant enum members
const getSomeValue = () => 1;

enum E {
  A = getSomeValue(),
  // C = 1,
  B,
}

/**
 * String enums
 */
//  In a string enum, each member has to be constant-initialized with a string literal, or with another string enum member.
// String enums allow you to give a meaningful and readable value when your code runs,
// independent of the name of the enum member itself.
enum Direction1 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

/**
 * Heterogeneous enums
 */
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

/**
 * Computed and constant members
 */
//  It is a compile time error for constant enum expressions to be evaluated to NaN or Infinity.
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length,
}

enum E {
  X,
}

enum E1 {
  X,
  Y,
  Z,
}

enum E2 {
  A = 1,
  B,
  C,
}

/**
 * Union enums and enum member types
 */
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

// The other change is that enum types themselves effectively become a union of each enum member.
// With union enums, the type system is able to leverage the fact that it knows the exact set of values that exist in the enum itself.
// Because of that, TypeScript can catch bugs where we might be comparing values incorrectly
enum E11 {
  Foo,
  Bar,
}

function f(x: E11) {
  if (x !== E11.Foo || x !== E11.Bar) {
  }
}

/**
 * Enums at runtime
 */
// Enums are real objects that exist at runtime. For example, the following enum
enum E12 {
  X,
  Y,
  Z,
}

function f12(obj: { X: number }) {
  return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
f12(E);

/**
 * Enums at compile time
 */
//  Even though Enums are real objects that exist at runtime, the keyof keyword works differently than you might expect for typical objects.
// Instead, use keyof typeof to get a Type that represents all Enum keys as strings.
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}
printImportant("ERROR", "This is a message");

/**
 * Reverse mappings
 */
enum Enum13 {
  A,
}

let a = Enum13.A;
let nameOfA = Enum13[a]; // "A"
// js code
// "use strict";
// var Enum;
// (function (Enum) {
//     Enum[Enum["A"] = 0] = "A";
// })(Enum || (Enum = {}));
// let a = Enum.A;
// let nameOfA = Enum[a]; // "A"

/**
 * const enums
 */
//  To avoid paying the cost of extra generated code and additional indirection when accessing enum values,
// it’s possible to use const enums. Const enums are defined using the const modifier on our enums
// Const enums can only use constant enum expressions and unlike regular enums they are completely removed during compilation

export const enum Direction11 {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Direction11.Up,
  Direction11.Down,
  Direction11.Left,
  Direction11.Right,
];
let d1 = Direction11.Down;
// error
let nameOfDown = Direction11[d1];

// export const enum Snack {
//   Apple = 0,
//   Banana = 1,
//   Orange = 2,
//   Other = 3,
// }

// var snackIndex = Snack.Apple // returning 0 in this example
// var userSnack = Snack[snackIndex] // would return 'Apple'

/**
 * Ambient enums
 */
//  Ambient enums are used to describe the shape of already existing enum types.
// 用于申明上下文环境中存在的枚举，不会编译成js代码
declare enum Enum {
  A = 1,
  B,
  C = 2,
}

/**
 * Objects vs Enums
 */
//  In modern TypeScript, you may not need an enum when an object with as const could suffice
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
