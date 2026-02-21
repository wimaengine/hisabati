/**
 * Clamps a value between a minimum and maximum.
 */
export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min
  if (value > max) return max

  return value
}



/**
 * Snaps a value to the nearest step.
 */
export function snap(value: number, step: number): number {
  return Math.round(value / step) * step
}



/**
 * Snaps a value down to the nearest step.
 */
export function snapDown(value: number, step: number): number {
  return Math.floor(value / step) * step
}



/**
 * Snaps a value up to the nearest step.
 */
export function snapUp(value: number, step: number): number {
  return Math.ceil(value / step) * step
}
