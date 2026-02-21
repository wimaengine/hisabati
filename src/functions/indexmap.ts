import { Vector2, Vector3 } from '../vectors'

/**
 * Maps a linear index to 2D coordinates for a given width.
 */
export function mapToIndex2D(value: number, width: number): Vector2 {
  return new Vector2(value % width, Math.floor(value / width))
}



/**
 * Maps a linear index to 3D coordinates for a given width and height.
 */
export function mapToIndex3D(index: number, width: number, height: number): Vector3 {
  const depthMax = width * height
  const rem = index % depthMax
  const z = Math.floor(index / depthMax)
  const y = Math.floor(rem / width)
  const x = rem % width

  return new Vector3(x, y, z)
}
