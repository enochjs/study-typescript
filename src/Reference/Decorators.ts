import "reflect-metadata";
// With the introduction of Classes in TypeScript and ES6,
// there now exist certain scenarios that require additional features to
// support annotating or modifying classes and class members
// Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members

/**
 * enable decorators
 */
//  experimentalDecorators

/**
 * Decorators
 */
//  A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter.
// Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.
function sealed(target) {
  // do something with 'target' ...
}

/**
 * Decorator Factories
 */
function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}

/**
 * Decorator Composition
 */
//  (f ∘ g)(x) is equivalent to f(g(x)).
//  @f @g x
// @f
// @g
// x

// 1.The expressions for each decorator are evaluated top-to-bottom.
// 2.The results are then called as functions from bottom-to-top.
function first() {
  console.log("first(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory evaluated");
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("second(): called");
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}

// execute order
// first(): factory evaluated
// second(): factory evaluated
// second(): called
// first(): called

/**
 * Decorator Evaluation
 */
// A Class Decorator is declared just before a class declaration. The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition
// If the class decorator returns a value, it will replace the class declaration with the provided constructor function.
// 装饰器装饰后的class，继承的时候，也是继承装饰后的class

@sealed1
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
    console.log("bug report");
  }
}
function sealed1(constructor: Function) {
  console.log("===sealed");
  Object.seal(constructor);
  Object.seal(constructor.prototype);
  return class {
    constructor() {
      console.log("sealed constructor");
    }
  };
}

// const bugReport = new BugReport("enoch");

class EnochBugReport extends BugReport {
  constructor() {
    super("enoch");
  }
}
const enochBugReport = new EnochBugReport();
// 打印  sealed constructor 而非bug report
// sealed constructor

function reportableClassDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    reportingURL = "http://www...";
  };
}

@reportableClassDecorator
class BugReport2 {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

const bug = new BugReport2("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"

// Note that the decorator _does not_ change the TypeScript type
// and so the new property `reportingURL` is not known
// to the type system: js执行的时候实际上是有的
console.log(bug.reportingURL);

/**
 * Method Decorators
 */
//  A Method Decorator is declared just before a method declaration.
// The decorator is applied to the Property Descriptor for the method, and can be used to observe, modify, or replace a method definition
// The Property Descriptor will be undefined if your script target is less than ES5.
// The return value is ignored if your script target is less than ES5.

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }

  @logger()
  printName() {
    console.log("print", this.greeting);
    return "Hello, " + this.greeting;
  }
}

function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}

function logger() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    console.log("===target", target, target.greeting);
    console.log("====", descriptor);
    descriptor.value = function (...args: any[]) {
      console.log("method execute start");
      const result = method.call(this, ...args);
      console.log("method execute end");
      return result;
    };
  };
}

const greeter = new Greeter("message");

greeter.printName();

/**
 * Accessor Decorators
 */
//  An Accessor Decorator is declared just before an accessor declaration. The accessor decorator is applied to the Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor’s definitions.

class Point2 {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() {
    return this._x;
  }

  @configurable(false)
  get y() {
    return this._y;
  }
}

function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
    // return {
    //   get: () => value,
    //   set: undefined,
    //   enumerable: true,
    //   configurable: true,
    // };
  };
}

const point2 = new Point2(1, 2);

console.log(point2.x, point2.y);

/**
 * Property Decorators
 */
//  A Property Decorator is declared just before a property declaration.
// ts装饰器作用于原型链，无法存储属性相关的信息，只能通过name区分记录 相关的操作信息，在要用到的地方，再从原数据中取出 name 的信息，做相应的操作
class Greeter3 {
  @format("Hello, %s")
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}

const formatMetadataKey = Symbol("format");
function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

/**
 * Parameter Decorators
 */

class BugReport5 {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }

  @validate1
  print(@required verbose: boolean) {
    if (verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`;
    } else {
      return this.title;
    }
  }
}

const requiredMetadataKey = Symbol("required");

function required(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingRequiredParameters: number[] =
    Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(
    requiredMetadataKey,
    existingRequiredParameters,
    target,
    propertyKey
  );
}

function validate1(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>
) {
  let method = descriptor.value!;

  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(
      requiredMetadataKey,
      target,
      propertyName
    );
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (
          parameterIndex >= arguments.length ||
          arguments[parameterIndex] === undefined
        ) {
          throw new Error("Missing required argument.");
        }
      }
    }
    return method.apply(this, arguments);
  };
}
