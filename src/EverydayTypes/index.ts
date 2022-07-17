/**
 * primitives
 */
// string number boolean null undefined symbol bigInt(ES2020)

let str: string
let num: number
let bool: boolean
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100)

// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n

const firstName = Symbol('name')
const secondName = Symbol('name')

// if (firstName === secondName) {
// This condition will always return 'false'  // Can't ever happen
// }

// strictNullChecks
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log('Hello, ' + x.toUpperCase())
  }
}
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed())
}

/**
 * array Array<T>  T[]
 */
let arr: string[]

/**
 * any
 */
// When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to any.
// noImplicitAny => 禁止隐式any
let anyType: any
anyType.name

/**
 * function
 * @param name
 */
// parameter type annotation,
function greeting(name: string) {
  console.log('Hello, ' + name.toUpperCase() + '!!')
}
greeting('enochjs')
// greeting(43)

// return type annotation
// you usually don’t need a return type because TypeScript will infer the function’s return type based on its return statements.
// Some codebases will explicitly specify a return type for documentation purposes, to prevent accidental changes, or just for personal preference.
function getFavoriteNumber(): number {
  return 42
}

/**
 * Anonymous Functions
 */
const names = ['Alice', 'Bob', 'Eve']

// When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types
names.forEach(function (s) {
  // 自动推导类型
  console.log(s.toUpperCase())
})

/**
 * object
 */
function printCoordObj(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}
printCoordObj({ x: 3, y: 7 })

// Optional Properties
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  // console.log(obj.last.toUpperCase())
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase())
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase())
}

/**
 * Union Types
 */
// TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators
// Defining a Union Type
function printId(id: number | string) {
  console.log('Your ID is: ' + id)
  if (typeof id === 'string') {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase())
  } else {
    // Here, id is of type 'number'
    console.log(id)
  }
}
// OK
printId(101)
// OK
printId('202')
// Error
// printId({ myID: 22342 })

/**
 * Type Aliases
 */
type Point = {
  x: number
  y: number
}

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}

printCoord({ x: 100, y: 100 })

type ID = number | string

/**
 * interface
 */
// An interface declaration is another way to name an object type:
interface IPoint {
  x: number
  y: number
}

function printCoordInterface(pt: IPoint) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}

printCoordInterface({ x: 100, y: 100 })

/**
 * Differences Between Type Aliases and Interfaces
 */
// Type aliases and interfaces are very similar, and in many cases you can choose between them freely.
// Almost all features of an interface are available in type,
// the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

// Extending an interface
interface IAnimal {
  name: string
}

interface Bear extends IAnimal {
  honey: boolean
}

const bear: Bear = {
  name: 'dog',
  honey: true,
}
bear.name
bear.honey

// Extending a type via intersections
type TAnimal = {
  name: string
}

type TBear = TAnimal & {
  honey: boolean
}

const tbear: TBear = {
  name: 'dog',
  honey: true,
}
tbear.name
tbear.honey

type a = { a: string }

// Adding new fields to an existing interface
interface Window {
  title: string
}

interface Window {
  ts: 'TypeScriptAPI'
}

// A type cannot be changed after being created
type TWindow = {
  title: string
}

// type TWindow = {
//   ts: 'TypeScriptAPI'
// }

/**
 * Type Assertions
 */
//  Sometimes you will have information about the type of a value that TypeScript can’t know about.

//  For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement,
// but you might know that your page will always have an HTMLCanvasElement with a given ID.
const myCanvas1 = document.getElementById('main_canvas') as HTMLCanvasElement
const myCanvas2 = <HTMLCanvasElement>document.getElementById('main_canvas')

// TypeScript only allows type assertions which convert to a more specific or less specific version of a type.
// const x = "hello" as number;

const x1 = ('hello' as unknown) as number
const x2 = ('hello' as any) as number

/**
 * Literal Types
 */

let changingString = 'Hello World'
changingString = 'Olá Mundo'
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString

const constantString = 'Hello World'
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString

let x: 'hello' = 'hello'
// OK
x = 'hello'
// false
// x = 'howdy'

function printText(s: string, alignment: 'left' | 'right' | 'center') {
  // ...
}
printText('Hello, world', 'left')
// printText("G'day, mate", "centre");

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1
}

// When you initialize a variable with an object, TypeScript assumes that the properties of that object might change values later.
// types are used to determine both reading and writing behavior.
// For example, if you wrote code like this:
const obj = { counter: 0 }
obj.counter = 1

function handleRequest(url: string, method: 'GET' | 'POST') {}

const req1 = { url: 'https://example.com', method: 'GET' as 'GET' }
handleRequest(req1.url, req1.method)

// You can use as const to convert the entire object to be type literals
const req2 = { url: 'https://example.com', method: 'GET' } as const
handleRequest(req2.url, req2.method)

/**
 * Enums
 */

//  Enums are a feature added to JavaScript by TypeScript which allows for describing a value which could be one of a set of possible named constants.
//  Unlike most TypeScript features, this is not a type-level addition to JavaScript but something added to the language and runtime.
enum TypeEnum {
  MALE = 1,
  FAMALE = 2,
}

// 总结
//  Static types systems describe the shapes and behaviors of what our values will be when we run our programs
// 1. primitives string number boolean null undefined symbol bigInt(ES2020)
// 2. type和interface主要区别， type定义无法修改和重复定义
// 3. type 也可以实现对象的扩展， 请看 178行
// 4. 字面量类型声明 const req2 = { url: 'https://example.com', method: 'GET' } as const
// 5. strictNullChecks 必须校验null和undefined
// 6. noImplicitAny 是否允许隐式any
