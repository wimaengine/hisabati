export function lerp(from: number, to: number, t: number): number {
  return from + t * (to - from)
}



export function inverseLerp(from: number, to: number, value: number): number {
  return (value - from) / (to - from)
}



export function remap(v: number, x1: number, y1: number, x2: number, y2: number): number {
  return x2 + v * (y2 - x2) / (y1 - x1)
}

