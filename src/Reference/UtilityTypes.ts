/**
 * Utility Types
 */

import { type } from 'os'

export {}

/**
 * Partial<Type>
 */
//  Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.
type MyPartialType<T> = {
  [P in keyof T]?: T[P]
}
interface Todo {
  title: string
  description: string
}
type PartialToto = Partial<Todo>
type PartialToto1 = MyPartialType<Todo>

/**
 * Readonly<Type>
 */
//  Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
interface Todo1 {
  title: string
}
type ReadonlyTodo = Readonly<Todo1>
type ReadonlyTodo1 = MyReadonly<Todo1>

/**
 * Record<Keys, Type>
 */
//  Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.
type KK = keyof any

type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}
interface CatInfo {
  age: number
  breed: string
}

type CatName = 'miffy' | 'boris' | 'mordred'

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
}

const cats2: MyRecord<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
}

/**
 * Pick<Type, Keys>
 */
//  Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
interface Todo3 {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo3, 'title' | 'completed'>
type MyTodoPreview = MyPick<Todo3, 'title' | 'completed'>
const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}

/**
 * Exclude<UnionType, ExcludedMembers>
 */
// Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.
type MyExclude<T, U> = T extends U ? never : T
type T0 = Exclude<'a' | 'b' | 'c', 'a'>
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
type T2 = Exclude<string | number | (() => void), Function>
type T3 = Exclude<'a' | 'b' | 'c', 'a' | 'e'>

/**
 * Omit<Type, Keys>
 */
//  Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).
type MyOmit<T, K extends keyof any> = MyPick<T, MyExclude<keyof T, K>>

interface Todo4 {
  title: string
  description: string
  completed: boolean
  createdAt: number
}

type TodoPreview4 = Omit<Todo4, 'description'>
type MyTodoPreview4 = MyOmit<Todo4, 'description'>

/**
 * Extract<Type, Union>
 */
//  Constructs a type by extracting from Type all union members that are assignable to Union.
type MyExtract<T, U> = T extends U ? T : never
type TT0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>
type TT1 = Extract<string | number | (() => void), Function>
type TT2 = MyExtract<'a' | 'b' | 'c', 'a' | 'f'>

/**
 * NonNullable<Type>
 */
//  Constructs a type by excluding null and undefined from Type.
type MyNonNullable<T> = T extends null | undefined ? never : T

type TN0 = NonNullable<string | number | undefined>
type TN1 = MyNonNullable<string | number | undefined>

/**
 * Parameters<Type>
 */
//  Constructs a tuple type from the types used in the parameters of a function type Type.
type MyParameter<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never

declare function f1(arg: { a: number; b: string }): void
type TF0 = Parameters<typeof f1>
type TF1 = MyParameter<typeof f1>

/**
 * ConstructorParameters<Type>
 */
//  Constructs a tuple or array type from the types of a constructor function type.
// It produces a tuple type with all the parameter types (or the type never if Type is not a function).

type MyConstructorParameters<
  T extends new (...args: any[]) => any
> = T extends new (...args: infer P) => any ? P : never

type TC0 = ConstructorParameters<ErrorConstructor>
type TC1 = MyConstructorParameters<ErrorConstructor>

/**
 * ReturnType<Type>
 */
//  Constructs a type consisting of the return type of function Type.
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never

type TF11 = ReturnType<() => string>
type TF12 = MyReturnType<() => string>

/**
 * InstanceType<Type>
 */
//  Constructs a type consisting of the instance type of a constructor function in Type.

type MyInstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any

class C {
  x = 0
  y = 0
  getPoint() {
    return {
      x: this.x,
      y: this.y,
    }
  }
}

type TC00 = InstanceType<typeof C>
type TC01 = MyInstanceType<typeof C>

abstract class Base {
  abstract getName(): string

  printName() {
    console.log('Hello, ' + this.getName())
  }
}

type TC02 = MyInstanceType<typeof Base>

/**
 * ThisParameterType<Type>
 */
//  Extracts the type of the this parameter for a function type, or unknown if the function type has no this parameter.
type MyThisParameterType<T> = T extends (this: infer P, ...args: any[]) => any ? P : unknown

function toHex(this: Number) {
  return this.toString(16);
}

type TThis =  ThisParameterType<typeof toHex>

type TThis1 =  MyThisParameterType<typeof toHex>
 
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
function numberToString2(n: MyThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}

/**
 * OmitThisParameter<Type>
 */

//  Removes the this parameter from Type. If Type has no explicitly declared this parameter, the result is simply Type. 
// Otherwise, a new function type with no this parameter is created from Type. Generics are erased and only the last overload signature is propagated into the new function type.

type MyOmitThisParameter<T> = T extends (this: infer P, ...args: infer A) => infer R ? (...args: A) => R  : T

function toHex1(this: Number) {
  return this.toString(16);
}
 
const fiveToHex: OmitThisParameter<typeof toHex1> = toHex1.bind(5);

const fiveToHex1: MyOmitThisParameter<typeof toHex1> = toHex1.bind(5);
 
console.log(fiveToHex());

/**
 * ThisType<Type>
 */
//  This utility does not return a transformed type. Instead, it serves as a marker for a contextual this type. Note that the noImplicitThis flag must be enabled to use this utility.
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M  & ThisType<D & M>; // Type of 'this' in methods is D & M
};
 
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
 
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
 
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);


/**
 * Intrinsic String Manipulation Types
 */
//  Uppercase<StringType>
//  Lowercase<StringType>
//  Capitalize<StringType>
//  Uncapitalize<StringType>