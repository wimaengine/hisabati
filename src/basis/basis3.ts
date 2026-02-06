import { Vector3 } from '../vectors'

export class Basis3 {

  x: Vector3

  y: Vector3

  z: Vector3

  constructor(
    x: Vector3 = new Vector3(1, 0, 0),
    y: Vector3 = new Vector3(0, 1, 0),
    z: Vector3 = new Vector3(0, 0, 1)
  ) {
    this.x = x
    this.y = y
    this.z = z
  }
}
