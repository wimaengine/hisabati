/**
 * Applies smoothstep easing to a value in [0,1].
 */
export function smoothStep(value: number): number {
  return value * value * (3 - 2 * value)
}



/**
 * Applies smootherstep easing to a value in [0,1].
 */
export function smootherStep(value: number): number {
  return value * value * value * (value * (value * 6 - 15) + 10)
}
