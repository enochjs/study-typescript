/**
 * The keyof type operator
 */
type Point1 = { x: number; y: number }
type P = keyof Point1

type Arrayish = { [n: number]: unknown }
type A1 = keyof Arrayish

type Mapish = { [k: string]: boolean }
// string | number
type M = keyof Mapish
