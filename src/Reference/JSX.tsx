/**
 * Basic usage
 */
//  preserve,
// The preserve mode will keep the JSX as part of the output to be further consumed by another transform step (e.g. Babel). Additionally the output will have a .jsx file extension
// react,
// The react mode will emit React.createElement, does not need to go through a JSX transformation before use, and the output will have a .js file extension
// react-native.
// The react-native mode is the equivalent of preserve in that it keeps all JSX, but the output will instead have a .js file extension.

/**
 * Type Checking
 */
//  Intrinsic elements
// Intrinsic elements are looked up on the special interface JSX.IntrinsicElements
// declare namespace JSX {
//   interface IntrinsicElements {
//     foo: any;
//   }
// }
// <foo />; // ok
{
  /* <bar />; // error */
}

/**
 * Value-based elements
 */
// import MyComponent from "./myComponent";
// <MyComponent />; // ok

// There are two ways to define a value-based element:
// 1. Function Component (FC)
// 2. Class Component

// Because these two types of value-based elements are indistinguishable from each other in a JSX expression,
// first TS tries to resolve the expression as a Function Component using overload resolution. If the process succeeds, then TS finishes resolving the expression to its declaration.
// If the value fails to resolve as a Function Component, TS will then try to resolve it as a class component.
// If that fails, TS will report an error.

/**
 * Function Component
 */
//  As the name suggests, the component is defined as a JavaScript function where its first argument is a props object.
// TS enforces that its return type must be assignable to JSX.Element.
interface FooProp {
  name: string;
  X: number;
  Y: number;
}
declare function AnotherComponent(prop: { name: string }): JSX.Element;
function ComponentFoo(prop: FooProp) {
  return <AnotherComponent name={prop.name} />;
}
const Button = (prop: { value: string }, context: { color: string }) => (
  <button />
);
