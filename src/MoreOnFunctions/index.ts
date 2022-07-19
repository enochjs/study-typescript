export {}

/**
 * Function Type Expressions
 */
function greeter(fn: (a: string) => void) {
  fn('hello world')
}

function printToConsole(s: string) {
  console.log(s)
}

type GreetFunction = (a: string) => void

greeter(printToConsole)

/**
 * Call Signatures
 */
//  In JavaScript, functions can have properties in addition to being callable.
// However, the function type expression syntax doesn’t allow for declaring properties.
// If we want to describe something callable with properties, we can write a call signature in an object type
type DescribableFunction = {
  description: string
  // (someArg: number, arg2: string): boolean
  (someArg: number): boolean
}
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + ' returned ' + fn(6))
}

// 貌似参数约束不住
const callable: DescribableFunction = () => {
  return true
}

// function callable() {
//   return true
// }
callable.description = 'this is a description function'

callable(3)

doSomething(callable)

/**
 * Construct Signatures
 */
//  JavaScript functions can also be invoked with the new operator.
// TypeScript refers to these as constructors because they usually create a new object.
// You can write a construct signature by adding the new keyword in front of a call signature:

// interface SomeObject {}
class SomeObject {
  constructor(name: string, age: number) {}
}

type SomeConstructor = {
  // 类型貌似也无法约束，感觉是为了已有的js库写类型用的
  new (s: string): SomeObject
}

function fn(ctor: SomeConstructor) {
  return new ctor('hello')
}

interface CallOrConstruct {
  new (s: string): Date
  (n?: number): number
}

/**
 * Generic Functions
 */
function firstElement<T>(arr: T[]) {
  // if (arr.length === 0) {
  //   return undefined
  // }
  return arr[0]
}
// s is of type 'string'
const s = firstElement(['a', 'b', 'c'])
// s.charAt
// n is of type 'number'
const n = firstElement([1, 2, 3])
// u is of type undefined
const u = firstElement([])

// Inference
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output,
): Output[] {
  return arr.map(func)
}

const parsed = map(['1', '2', '3'], (n) => parseInt(n))

// Constraints
function longest<T extends { length: number }, U extends { length: number }>(
  a: T,
  b: U,
) {
  if (a.length >= b.length) {
    return a
  } else {
    return b
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3])
// longerString is of type 'alice' | 'bob'
const longerString = longest('alice', 'bob')
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100)

const arrayVsStringOK = longest([1, 2, 3], 'string')

/**
 * Guidelines for Writing Good Generic Functions
 */
// push Type Parameters Down
function firstElement1<Type>(arr: Type[]) {
  return arr[0]
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0]
}

// a: number (good)
const a = firstElement1([1, 2, 3])
// b: any (bad)
const b = firstElement2([1, 2, 3])

/**
 * Use Fewer Type Parameters
 */

function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func)
}

const result1 = filter1([1, 2, 3, 4, 5], (arg) => arg > 4)

function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func,
): Type[] {
  return arr.filter(func)
}
const result2 = filter2([1, 2, 3, 4, 5], (arg) => arg > 4)

// Remember, type parameters are for relating the types of multiple values.
// If a type parameter is only used once in the function signature, it’s not relating anything.
// If a type parameter only appears in one location, strongly reconsider if you actually need it
function greetBad<Str extends string>(s: Str) {
  console.log('Hello, ' + s)
}

function greetGood(s: string) {
  console.log('Hello, ' + s)
}
