/**
 * Class Members
 */

export {};
// fields
class Point {
  x = 0;
  y = 0;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;

// --strictPropertyInitialization
// The strictPropertyInitialization setting controls whether class fields need to be initialized in the constructor.

class GoodGreeter {
  name: string;

  constructor() {
    this.name = "hello";
  }
}

// TypeScript does not analyze methods you invoke from the constructor to detect initializations,
// because a derived class might override those methods and fail to initialize the members
// If you intend to definitely initialize a field through means other than the constructor
// (for example, maybe an external library is filling in part of your class for you),
// you can use the definite assignment assertion operator, !
class GoodGreeter1 {
  name!: string;

  constructor() {}
  init() {
    this.name = "hello";
  }
}

/**
 * readonly
 */
//  Fields may be prefixed with the readonly modifier. This prevents assignments to the field outside of the constructor.
class Greeter {
  readonly name: string = "world";

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }

  err() {
    // this.name = 'not ok'
  }
}
const g = new Greeter();
// g.name = 'also not ok'

/**
 * Constructors
 */
//  Class constructors are very similar to functions. You can add parameters with type annotations, default values, and overloads:
class Point1 {
  x: number;
  y: number;

  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Point2 {
  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}
// There are just a few differences between class constructor signatures and function signatures:
// Constructors can’t have type parameters - these belong on the outer class declaration, which we’ll learn about later
// Constructors can’t have return type annotations - the class instance type is always what’s returned

/**
 * Super Calls
 */

//  Just as in JavaScript, if you have a base class, you’ll need to call super(); in your constructor body before using any this. members:
class Base {
  k = 4;
}

class Derived extends Base {
  constructor() {
    super();
    console.log(this.k);
  }
}

/**
 * Methods
 */
//  A function property on a class is called a method. Methods can use all the same type annotations as functions and constructors:
class Point3 {
  x = 10;
  y = 10;

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}

/**
 * Getters / Setters
 */
//  TypeScript has some special inference rules for accessors:

//  If get exists but no set, the property is automatically readonly
//  If the type of the setter parameter is not specified, it is inferred from the return type of the getter
//  Getters and setters must have the same Member Visibility

class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}

class Thing {
  _size = 0;

  get size(): number {
    return this._size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);

    // Don't allow NaN, Infinity, etc

    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }

    this._size = num;
  }
}

const thing = new Thing();
// thing.size

/**
 * Index Signatures
 */
// Because the index signature type needs to also capture the types of methods,
// it’s not easy to usefully use these types.
// Generally it’s better to store indexed data in another place instead of on the class instance itself.

class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }

  // getName() {
  // }
}

/**
 * Class Heritage
 */
// implements Clauses
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}

class Ball implements Pingable {
  ping(): void {
    throw new Error("Method not implemented.");
  }
  pong() {
    console.log("pong!");
  }
}

// Cautions
interface Checkable {
  check(name: string): boolean;
}

// It’s important to understand that an implements clause is only a check that the class can be treated as the interface type.
// It doesn’t change the type of the class or its methods at all.
class NameChecker implements Checkable {
  check(s: string) {
    return s.toLowerCase() === "ok";
  }
}

/**
 * extends Clauses
 */

class Animal {
  move() {
    console.log("Moving along!");
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}

const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);

/**
 * Overriding Methods
 */
class Base1 {
  greet() {
    console.log("Hello, world!");
  }
}

class Derived1 extends Base1 {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

const dd = new Derived1();
dd.greet();
dd.greet("reader");

class Base2 {
  greet() {
    console.log("Hello, world!");
  }
}

// It’s important that a derived class follow its base class contract.
// Remember that it’s very common (and always legal!) to refer to a derived class instance through a base class reference:

class Derived2 extends Base2 {
  // Make this parameter required
  // greet(name?: string) {
  //   console.log(`Hello, ${name?.toUpperCase()}`)
  // }

  // greet(name: string) {
  //   console.log(`Hello, ${name?.toUpperCase()}`)
  // }

  greet(name?: string, age?: number) {
    console.log(`Hello, ${name?.toUpperCase()}`);
  }
}

const bb: Base2 = new Derived2();
// Crashes because "name" will be undefined
bb.greet();

/**
 * Type-only Field Declarations
 */
//  When target >= ES2022 or useDefineForClassFields is true, class fields are initialized after the parent class constructor completes,
// overwriting any value set by the parent class. This can be a problem when you only want to re-declare a more accurate type for an inherited field.
// To handle these cases, you can write declare to indicate to TypeScript that there should be no runtime effect for this field declaration.
interface Animal {
  dateOfBirth: any;
}

interface Dog extends Animal {
  breed: any;
}

class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}

/**
 * Initialization Order
 */
//  The order of class initialization, as defined by JavaScript, is:

//  The base class fields are initialized
//  The base class constructor runs
//  The derived class fields are initialized
//  The derived class constructor runs

/**
 * Inheriting Built-in Types
 */

/**
 * Member Visibility
 */

// public default
class Greeter2 {
  public greet() {
    console.log("hi!");
  }
}
const g2 = new Greeter2();
g2.greet();

// protected
// protected members are only visible to subclasses of the class they’re declared in.
class Greeter3 {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}

class SpecialGreeter extends Greeter3 {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const gg = new SpecialGreeter();
gg.greet(); // OK
// gg.getName()

// Exposure of protected members
class Base4 {
  protected m = 10;
}
class Derived4 extends Base4 {
  // No modifier, so default is 'public'
  m = 15;
}
const ddd = new Derived4();
console.log(ddd.m); // OK

// private
// Cross-instance private access
class A {
  private x = 10;

  public sameAs(other: A) {
    // No error
    return other.x === this.x;
  }
}

// Generic Classes
// class Box<Type> {
//   static defaultValue: Type
// }

/**
 * this parameters
 */
//  TypeScript checks that calling a function with a this parameter is done so with a correct context.
// Instead of using an arrow function, we can add a this parameter to method definitions to statically enforce that the method is called correctly:
//  In a method or function definition, an initial parameter named this has special meaning in TypeScript.
// These parameters are erased during compilation:
function fn(this: SomeType, x: number) {
  /* ... */
}

// JavaScript output
// function fn(x) {
//   /* ... */
// }

class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}

class DerivedBox extends Box {
  otherContent: string = "?";
}

const base = new Box();
const derived = new DerivedBox();
// derived.sameAs(base)

/**
 * this-based type guards
 */
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}

class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}

class Directory extends FileSystemObject {
  children: FileSystemObject[] = [];
}

interface Networked {
  host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
  fso;
  // fso.content
  // const fso: FileRep
} else if (fso.isDirectory()) {
  // fso.children
  fso;
  // const fso: Directory
} else if (fso.isNetworked()) {
  fso;
}

/**
 * Parameter Properties
 */
//  TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value.
// These are called parameter properties and are created by prefixing a constructor argument with one of the visibility modifiers public, private, protected, or readonly.
// The resulting field gets those modifier(s):
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a = new Params(1, 2, 3);
console.log(a.x);

/**
 * Class Expressions
 */
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};

const m = new someClass("Hello, world");

/**
 * abstract Classes and Members
 */
//  An abstract method or abstract field is one that hasn’t had an implementation provided.
// These members must exist inside an abstract class, which cannot be directly instantiated.
// The role of abstract classes is to serve as a base class for subclasses which do implement all the abstract members.
// When a class doesn’t have any abstract members, it is said to be concrete.
abstract class Base123 {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

class Derived123 extends Base123 {
  getName() {
    return "world";
  }
}

const d123 = new Derived123();
d123.printName();

/**
 * Abstract Construct Signatures
 */
function greet(ctor: typeof Base123) {
  // const instance = new ctor()
  // instance.printName()
}
//bad
greet(Base123);

function greet1(ctor: new () => Base123) {
  const instance = new ctor();
  instance.printName();
}
greet1(Derived123);
// greet1(Base123);

// Relationships Between Classes
class Person {
  name: string = "e";
  age: number = 1;
}

class Employee {
  name: string = "ee";
  age: number = 22;
  salary: number = 23;
}

// OK
const p: Person = new Employee();
// const e1: Employee = new Person()

/**
 * Arrow Functions
 */
class MyClass1 {
  name = "MyClass";
  public getName = () => {
    return this.name;
  };

  getName2() {
    return this.name;
  }
}
const c = new MyClass1();
const ggg = c.getName;
// Prints "MyClass" instead of crashing
console.log(ggg());

class MyClass2 extends MyClass1 {
  name = "myClass2";

  getName = () => {
    // 会报错
    super.getName();
    return this.name;
  };

  getName2() {
    super.getName2();
    return this.name;
  }
}

// The this value is guaranteed to be correct at runtime, even for code not checked with TypeScript
// This will use more memory, because each class instance will have its own copy of each function defined this way
// You can’t use super.getName in a derived class, because there’s no entry in the prototype chain to fetch the base class method from
// var MyClass1 = /** @class */ (function () {
//   function MyClass1() {
//       var _this = this;
//       this.name = 'MyClass';
//       this.getName = function () {
//           return _this.name;
//       };
//   }
//   MyClass1.prototype.getName2 = function () {
//       return this.name;
//   };
//   return MyClass1;
// }());

const c2 = new MyClass2();
const gggg = c2.getName;
// Prints "MyClass" instead of crashing
console.log(ggg());

// 总结
// ts可以用this参数 可以约束类型
// 抽象类主要是为了让继承类实现某些接口，本身不能 实力化
// ctor: new () => Base123 优于 typeof Base123，可以让ts check出抽象类
// Arrow Functions 箭头函数中不能调用父类的方法, 箭头函数 挂在class成员上， 正常的函数是在prototype上，具体请看编译后的代码
