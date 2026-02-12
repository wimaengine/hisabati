export function lerp(from: number, to: number, t: number): number {
  return from + t * (to - from)
}



export function inverseLerp(from: number, to: number, value: number): number {
  return (value - from) / (to - from)
}

