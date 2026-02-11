export function smoothStep(value: number): number {
  return value * value * (3 - 2 * value)
}



export function smootherStep(value: number): number {
  return value * value * value * (value * (value * 6 - 15) + 10)
}
