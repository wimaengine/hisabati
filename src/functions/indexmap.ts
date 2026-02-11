import { Vector2, Vector3 } from '../vectors'

export function mapToIndex2D(value: number, width: number): Vector2 {
  return new Vector2(value % width, Math.floor(value / width))
}

