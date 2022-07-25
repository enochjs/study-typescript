// A major part of software engineering is building components that not only have well-defined and consistent APIs,
// but are also reusable. Components that are capable of working on the data of today
// as well as the data of tomorrow will give you the most flexible capabilities for building up large software systems.

/**
 * Hello World of Generics
 */
function identity<Type>(arg: Type): Type {
  return arg
}

// We say that this version of the identity function is generic, as it works over a range of types.
// Unlike using any, it’s also just as precise (i.e., it doesn’t lose any information) as the first identity function that used numbers for the argument and return type.

let output = identity<string>('myString')
// use type argument inference
let output1 = identity('myString')

/**
 * Working with Generic Type Variables
 * @param arg
 * @returns
 */
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length) // Array has a .length, so no more error
  return arg
}

/**
 * Generic Types
 */
function identity1<Type>(arg: Type): Type {
  return arg
}

let myIdentity: <Type>(arg: Type) => Type = identity1
let myIdentity1: <Input>(arg: Input) => Input = identity1
let myIdentity2: { <Type>(arg: Type): Type } = identity1

interface GenericIdentityFn {
  <Type>(arg: Type): Type
}
let myIdentity3: GenericIdentityFn = identity
const result1 = myIdentity3('string')

interface GenericIdentityFn1<Type> {
  (arg: Type): Type
}
let myIdentity4: GenericIdentityFn1<number> = identity
myIdentity4(1)

/**
 * Generic Classes
 */
class GenericNumber<Type> {
  zeroValue: Type
  add = (x: Type, y: Type) => {
    return x
  }

  constructor(arg: Type) {
    this.zeroValue = arg
  }
}

/**
 * Generic Constraints
 */
interface Lengthwise {
  length: number
}

function loggingIdentity1<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length) // Now we know it has a .length property, so no more error
  return arg
}

/**
 * Using Type Parameters in Generic Constraints
 */
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}

/**
 * Using Class Types in Generics
 */
function create<Type>(c: { new (): Type }): Type {
  return new c()
}
class BeeKeeper {
  hasMask: boolean = true
}

class ZooKeeper {
  nametag: string = 'Mikle'
}

class Animal1 {
  numLegs: number = 4
}

class Bee extends Animal1 {
  keeper: BeeKeeper = new BeeKeeper()
}

class Lion extends Animal1 {
  keeper: ZooKeeper = new ZooKeeper()
}

function createInstance<A extends Animal1>(c: new () => A): A {
  return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask
