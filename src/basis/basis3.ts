import { Vector3 } from '../vectors'
import type { Vector3Like } from '../vectors'

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

  /**
   * Serializes this basis.
   */
  serialize(): Basis3Like {
    return Basis3.serialize(this)
  }

  /**
   * Serializes a basis to an object.
   */
  static serialize(value: Basis3): Basis3Like {
    return {
      x: Vector3.serialize(value.x),
      y: Vector3.serialize(value.y),
      z: Vector3.serialize(value.z)
    }
  }

  /**
   * Deserializes a basis from an object.
   */
  static deserialize(value: Basis3Like, out = new Basis3()): Basis3 {
    out.x = Vector3.deserialize(value.x, out.x)
    out.y = Vector3.deserialize(value.y, out.y)
    out.z = Vector3.deserialize(value.z, out.z)

    return out
  }

  /**
   * Checks whether a value is a valid basis serial.
   */
  static validateSerial(value: unknown): value is Basis3Like {
    if (!value || typeof value !== 'object') {
      return false
    }

    if (!('x' in value) || !('y' in value) || !('z' in value)) {
      return false
    }

    const serial = value as Basis3Like

    return Vector3.validateSerial(serial.x) &&
      Vector3.validateSerial(serial.y) &&
      Vector3.validateSerial(serial.z)
  }
}

export type Basis3Like = {
  x: Vector3Like
  y: Vector3Like
  z: Vector3Like
}
