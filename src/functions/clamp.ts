export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min
  if (value > max) return max

  return value
}



export function snap(value: number, step: number): number {
  return Math.round(value / step) * step
}



export function snapDown(value: number, step: number): number {
  return Math.floor(value / step) * step
}

