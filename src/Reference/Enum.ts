// Enums allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases.
// TypeScript provides both numeric and string-based enums.

/**
 * Numeric enums
 */
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

/**
 * String enums
 */
enum Direction1 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

/**
 * Heterogeneous enums
 */
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES',
}

/**
 * Computed and constant members
 */

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
]

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
declare enum Enum {
  A = 1,
  B,
  C = 2,
}
