import { DEG2RAD, RAD2DEG } from '../constants'

/**
 * Returns the square of a number.
 */
export function sq(x: number): number {
  return x * x
}



/**
 * Raises a number to a power.
 */
export function exp(x: number, e: number = 2): number {
  return x ** e
}



/**
 * Returns the square root of a number.
 */
export function sqrt(x: number): number {
  return Math.sqrt(x)
}



/**
 * Returns the multiplicative inverse of a number.
 */
export function invert(value: number): number {
  return 1 / value
}



/**
 * Rounds a number to a fixed precision.
 */
export function round(number: number, precision: number = 4): number {
  const x = 10 ** precision

  return Math.round(number * x) / x
}



/**
 * Maps a pair of natural numbers to a single natural number.
 */
export function naturalizePair(a: number, b: number): number {
  if (a > b) return (a + b) * (a + b + 1) / 2 + a

  return (a + b) * (a + b + 1) / 2 + b
}



/**
 * Converts degrees to radians.
 */
export function degToRad(deg: number): number {
  return deg * DEG2RAD
}



/**
 * Converts radians to degrees.
 */
export function radToDeg(rad: number): number {
  return rad * RAD2DEG
}



/**
 * Wraps a value into the [min, max) range.
 */
export function wrap(value: number, min: number, max: number): number {
  const range = max - min

  return (min + ((((value - min) % range) + range) % range))
}



/**
 * Maps a pair of non-negative numbers to a single unique number.
 */
export function cantorPair(a: number, b: number): number {
  return 0.5 * (a + b) * (a + b + 1) + b

}



/**
 * Maps a pair of signed numbers to a single unique number.
 */
export function cantorPairSigned(a: number, b: number): number {
  const x = (a >= 0.0 ? 2.0 * a : (-2.0 * a) - 1.0)
  const y = (b >= 0.0 ? 2.0 * b : (-2.0 * b) - 1.0)

  return cantorPair(x, y)
}



/**
 * Checks approximate equality within a tolerance.
 */
export function fuzzyEqual(a: number, b: number, tolerance: number = Number.EPSILON): boolean {
  return Math.abs(a - b) <= tolerance
}
