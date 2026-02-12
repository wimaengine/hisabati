export function lerp(from: number, to: number, t: number): number {
  return from + t * (to - from)
}

