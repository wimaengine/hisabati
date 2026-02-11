export function smoothStep(value: number): number {
  return value * value * (3 - 2 * value)
}

