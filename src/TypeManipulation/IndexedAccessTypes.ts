export {}

type Person = { age: number; name: string; alive: boolean }
type Age = Person['age']

type I1 = Person['age' | 'name']

type I2 = Person[keyof Person]

type keys = keyof Person

const a: keys = 'age'

type AliveOrName = 'alive' | 'name'
type I3 = Person[AliveOrName]

const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 },
]

type Person2 = typeof MyArray[number]

type Age2 = typeof MyArray[number]['age']

type Age3 = Person2['age']

const key = 'age'
// type key = 'age'
// You can only use types when indexing, meaning you can’t use a const to make a variable reference:
type Age4 = Person2[typeof key]

// 总结
// 数组可以用  type Person2 = typeof MyArray[number]，获取数组成员类型
