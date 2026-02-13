import { DEG2RAD, RAD2DEG } from '../constants'

export function sq(x: number): number {
  return x * x
}



export function exp(x: number, e: number = 2): number {
  return x ** e
}



export function sqrt(x: number): number {
  return Math.sqrt(x)
}



export function invert(value: number): number {
  return 1 / value
}



export function round(number: number, precision: number = 4): number {
  const x = 10 ** precision

  return Math.round(number * x) / x
}



export function naturalizePair(a: number, b: number): number {
  if (a > b) return (a + b) * (a + b + 1) / 2 + a

  return (a + b) * (a + b + 1) / 2 + b
}

