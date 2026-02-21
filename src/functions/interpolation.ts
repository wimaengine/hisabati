/**
 * Linearly interpolates between two values.
 */
export function lerp(from: number, to: number, t: number): number {
  return from + t * (to - from)
}



/**
 * Returns the interpolation factor for a value between bounds.
 */
export function inverseLerp(from: number, to: number, value: number): number {
  return (value - from) / (to - from)
}



/**
 * Remaps a value from one range to another.
 */
export function remap(v: number, x1: number, y1: number, x2: number, y2: number): number {
  return x2 + v * (y2 - x2) / (y1 - x1)
}



/**
 * Collection of interpolation functions.
 */
export const Interpolation = {

  Linear(p0: number, p1: number, t: number): number {
    return (p1 - p0) * t + p0
  },

  CatmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const v0 = (p2 - p0) * 0.5
    const v1 = (p3 - p1) * 0.5
    const t2 = t * t
    const t3 = t * t2

    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
  },

  cosine(p0: number, p1: number, t: number): number {
    const c = (1 - Math.cos(t * 3.1415927)) * 0.5

    return (1 - c) * p0 + c * p1
  }
}
