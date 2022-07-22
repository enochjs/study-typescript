/**
 * Property Modifiers
 */

//  Optional Properties
interface PaintOptions {
  shape: 'cicle'
  xPos?: number
  yPos?: number
}

// Note that there is currently no way to place type annotations within destructuring patterns.
// This is because the following syntax already means something different in JavaScript.
// 和js别名语法冲突了 const {shape: Shape} = { shape: 'cicle' }
function draw1({ shape: Shape, xPos: number = 100 /*...*/ }) {
  const { a: b } = { a: 'cicle' }
  // render(shape)
  // Cannot find name 'shape'. Did you mean 'Shape'?
  // render(xPos);
  // Cannot find name 'xPos'.
}

// readonly Properties
// Properties can also be marked as readonly for TypeScript.
// While it won’t change any behavior at runtime, a property marked as readonly can’t be written to during type-checking.
interface SomeType {
  readonly prop: string
}

function doSomething(obj: SomeType) {
  console.log(`prop has the value '${obj.prop}'.`)
  // obj.prop = "hello";
}

// Using the readonly modifier doesn’t necessarily imply that a value is totally immutable - or in other words, that its internal contents can’t be changed.
//  It just means the property itself can’t be re-written to.
interface Home {
  readonly resident: { name: string; age: number }
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`)
  home.resident.age++
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  // home.resident = {
  //   name: "Victor the Evictor",
  //   age: 42,
  // };
}

interface Person {
  name: string
  age: number
}

interface ReadonlyPerson {
  readonly name: string
  readonly age: number
}

let writablePerson: Person = {
  name: 'Person McPersonface',
  age: 42,
}

let readonlyPerson: ReadonlyPerson = writablePerson

console.log(readonlyPerson.age) // prints '42'
writablePerson.age += 1
console.log(readonlyPerson.age) // prints '43'
// readonlyPerson.age += 1

/**
 * Index Signatures
 */
//  Sometimes you don’t know all the names of a type’s properties ahead of time, but you do know the shape of the values.
//  In those cases you can use an index signature to describe the types of possible values
interface StringArray {
  [index: number]: string
}

const myArray: StringArray = ['1', '2', '3']
const secondItem = myArray[1]

// t is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer.
// This is because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object.
// That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.
interface Animal1 {
  name: string
}

interface Dog extends Animal1 {
  breed: string
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
// interface NotOkay {
//   [x: number]: Animal
//   [x: string]: Dog
// }

interface Okay {
  [x: number]: Dog
  [x: string]: Animal1
}

// While string index signatures are a powerful way to describe the “dictionary” pattern,
// they also enforce that all properties match their return type.
// This is because a string index declares that obj.property is also available as obj["property"].
// In the following example, name’s type does not match the string index’s type, and the type checker gives an error:
interface NumberDictionary {
  [index: string]: number
  length: number // ok
  // name: string
}

interface NumberOrStringDictionary {
  [index: string]: number | string
  length: number // ok, length is a number
  name: string // ok, name is a string
}

interface ReadonlyStringArray {
  readonly [index: number]: string
}

let myArray1: ReadonlyStringArray = []
// myArray1[2] = 'Mallory'

/**
 * Extending Types
 */
interface BasicAddress {
  name?: string
  street: string
  city: string
  country: string
  postalCode: string
}

interface AddressWithUnit extends BasicAddress {
  unit: string
}

let a: AddressWithUnit

/**
 * Intersection Types
 */
interface Colorful {
  color: string
}
interface Circle {
  radius: number
}

type ColorfulCircle = Colorful & Circle

let b: ColorfulCircle

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`)
  console.log(`Radius was ${circle.radius}`)
}

draw({ color: 'blue', radius: 42 })

/**
 * Generic Object Types
 */
interface Box<Type> {
  contents: Type
}

type Box1<Type> = {
  contents: Type
}

interface Array1<Type> {
  /**
   * Gets or sets the length of the array.
   */
  length: number

  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined

  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: Type[]): number
}

/**
 * The ReadonlyArray Type
 */
function doStuff(values: ReadonlyArray<string>) {
  values.filter((item) => item)
  // We can read from 'values'...
  const copy = values.slice()
  console.log(`The first value is ${values[0]}`)

  // values.push("hello!");
  // values.
}

function doStuff2(values: readonly string[]) {
  // We can read from 'values'...
  const copy = values.slice()
  console.log(`The first value is ${values[0]}`)
  // values.push("hello!");
}

// One last thing to note is that unlike the readonly property modifier, assignability isn’t bidirectional between regular Arrays and ReadonlyArrays.
let x: readonly string[] = []
let y: string[] = []

x = y
// y = x;

/**
 * Tuple Types
 */
type StringNumberPair = [string, number]
function doSomething2(pair: [string, number]) {
  const a = pair[0]

  const b = pair[1]
}

doSomething2(['hello', 42])

// Tuple types are useful in heavily convention-based APIs, where each element’s meaning is “obvious”.
// This gives us flexibility in whatever we want to name our variables when we destructure them. In the above example, we were able to name elements 0 and 1 to whatever we wanted.

// However, since not every user holds the same view of what’s obvious,
// it may be worth reconsidering whether using objects with descriptive property names may be better for your API.

interface StringNumberPair1 {
  length: 2
  0: string
  1: number
}

function doSomething3(pair: StringNumberPair1) {
  const a = pair[0]

  const b = pair[1]
}

doSomething2(['hello', 42])

type StringNumberBooleans = [string, number, ...boolean[]]
type StringBooleansNumber = [string, ...boolean[], number]
type BooleansStringNumber = [...boolean[], string, number]
const a1: StringNumberBooleans = ['hello', 1]
const b1: StringNumberBooleans = ['beautiful', 2, true]
const c1: StringNumberBooleans = ['world', 3, true, false, true, false, true]

/**
 * readonly Tuple Types
 * @param pair
 */
function doSomething4(pair: readonly [string, number]) {
  // ...
}

let point = [3, 4]

function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2)
}

// distanceFromOrigin(point)

distanceFromOrigin([5, 6])

// 总结
// Index Signatures { [index: numer]: type } 请看 106行，用了index Signatures， 所有的属性都必须符合type
//
