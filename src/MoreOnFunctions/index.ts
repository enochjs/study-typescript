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

/**
 * Optional Parameters
 */
declare function f(x?: number): void
// cut
// All OK
f()
f(10)
f(undefined)

// callback
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    // I don't feel like providing the index today
    callback(arr[i])
  }
}

myForEach([1, 2, 3], (a, i) => {
  // console.log(i.toFixed())
})
// When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument

/**
 * Function Overloads
 */
//  Then, we wrote a function implementation with a compatible signature.
// Functions have an implementation signature, but this signature can’t be called directly.
// Even though we wrote a function with two optional parameters after the required one, it can’t be called with two parameters!

function makeDate(timestamp: number): Date
function makeDate(m: number, d: number, y: number): Date
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d)
  } else {
    return new Date(mOrTimestamp)
  }
}

const d1 = makeDate(12345678)
const d2 = makeDate(5, 5, 5)
// const d3 = makeDate(1, 3)

// function fn1(x: string): void
// function fn1(x: boolean): void
// function fn1(x: string | boolean) {}

function len(s: string): number
function len(arr: any[]): number
function len(x: any[] | string) {
  return x.length
}

len('') // OK
len([0]) // OK
// len(Math.random() > 0.5 ? 'hello' : [0])

/**
 * Declaring this in a Function
 */
//  The JavaScript specification states that you cannot have a parameter called this,
// and so TypeScript uses that syntax space to let you declare the type for this in the function body.

interface User {
  id: number
  admin: boolean
}

const user = {
  id: 123,
  admin: false,
  becomeAdmin: function (this: User) {
    this.admin = true
  },
}

user.becomeAdmin()
const user1 = {
  id: 123,
  admin: false,
}
user.becomeAdmin.call(user1)

class DB {
  users: string[] = []

  // 编译后，没有this这个参数，具体看下方调用
  filterUsers(this: DB, name: string) {
    this.users.filter((item) => item.includes(name))
  }
}

const db = new DB()

db.filterUsers('name')

// const aa = { users: ['name', 'tag'] }
// db.filterUsers.call(aa)
