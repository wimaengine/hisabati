/**
 * Returns a random number in the [min, max) range.
 */
export function rand(min: number = 0, max: number = 1): number {
  return Math.random() * (max - min) + min
}
