/**
 * Conditional Types
 */
//  Conditional types take a form that looks a little like conditional expressions (condition ? trueExpression : falseExpression) in JavaScript:

// SomeType extends OtherType ? TrueType : FalseType;
export {}

interface Animal {
  live(): void
}
interface Dog extends Animal {
  woof(): void
}

type Example1 = Dog extends Animal ? number : string

type Example2 = RegExp extends Animal ? number : string

interface IdLabel {
  id: number /* some fields */
}
interface NameLabel {
  name: string /* other fields */
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw 'unimplemented'
}

let a = createLabel('typescript')

let b = createLabel(2.8)

let c = createLabel(Math.random() ? 'hello' : 42)

/**
 * Conditional Type Constraints
 */
// what if we wanted MessageOf to take any type, and default to something like never if a message property isn’t available

type MessageOf1<T extends { message: unknown }> = T['message']
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never

interface Email {
  message: string
}

interface Dog {
  bark(): void
}

type EmailMessageContents = MessageOf<Email>

type DogMessageContents = MessageOf<Dog>

// flatten
type Flatten<T> = T extends any[] ? T[number] : T

// Extracts out the element type.
type Str = Flatten<string[]>

// Leaves the type alone.
type Num = Flatten<number>

/**
 * Inferring Within Conditional Types
 */
//  we could have inferred the element type in Flatten instead of fetching it out “manually” with an indexed access type:
type Flatten1<Type> = Type extends Array<infer Item> ? Item : Type

type Flatten2<Type> = Type extends infer Item ? Item : Type

let aa: Flatten1<string[]>
// let a2: Flatten2<string[]>
// let a3: Flatten2<{ name: 123 }>

type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never

function print(info: { name: string; age: number; sex: 'male' | 'female' }) {
  if (info.sex === 'male') {
    return {
      ...info,
      sex: '男',
    }
  }
  return {
    ...info,
    sex: '女',
  }
}

type PrintReturn = MyReturnType<typeof print>

type MyParameterType<T extends (...args: any[]) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never

type PrintParameter = MyParameterType<typeof print>

type MyInstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer R
  ? R
  : never

type MyConstructorParameters<
  T extends new (...args: any[]) => any
> = T extends new (...args: infer R) => any ? R : never

class AA {
  name: string
  constructor(name: string) {
    this.name = name
    return this
  }
}

type AAReturn = MyInstanceType<typeof AA>

type AAParameter = MyConstructorParameters<typeof AA>

// When inferring from a type with multiple call signatures (such as the type of an overloaded function),
// inferences are made from the last signature (which, presumably, is the most permissive catch-all case).
// It is not possible to perform overload resolution based on a list of argument types.
declare function stringOrNum(x: string): number
declare function stringOrNum(x: number): string
declare function stringOrNum(x: string | number): string | number

type stringOrNumReturn = ReturnType<typeof stringOrNum>

/**
 * Distributive Conditional Types
 */
type ToArray<Type> = Type extends any ? Type[] : never
type StrArrOrNumArr = ToArray<string | number>
// ToArray<string> | ToArray<number>;

// To avoid that behavior, you can surround each side of the extends keyword with square brackets.
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never
type StrArrOrNumArr1 = ToArrayNonDist<string | number>

// 总结
// infer 就是根据所给类型，推导相应的 结果
// Distributive 需要了解一下
