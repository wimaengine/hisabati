import { Vector2 } from '../vectors'
import type { Vector2Like } from '../vectors'

export class Basis2 {

  x: Vector2

  y: Vector2

  constructor(x: Vector2 = new Vector2(1, 0), y: Vector2 = new Vector2(0, 1)) {
    this.x = x
    this.y = y
  }

  /**
   * Serializes this basis.
   */
  serialize(): Basis2Like {
    return Basis2.serialize(this)
  }

  /**
   * Serializes a basis to an object.
   */
  static serialize(value: Basis2): Basis2Like {
    return {
      x: Vector2.serialize(value.x),
      y: Vector2.serialize(value.y)
    }
  }

  /**
   * Deserializes a basis from an object.
   */
  static deserialize(value: Basis2Like, out = new Basis2()): Basis2 {
    out.x = Vector2.deserialize(value.x, out.x)
    out.y = Vector2.deserialize(value.y, out.y)

    return out
  }

  /**
   * Checks whether a value is a valid basis serial.
   */
  static validateSerial(value: unknown): value is Basis2Like {
    if (!value || typeof value !== 'object') {
      return false
    }

    if (!('x' in value) || !('y' in value)) {
      return false
    }

    const serial = value as Basis2Like

    return Vector2.validateSerial(serial.x) &&
      Vector2.validateSerial(serial.y)
  }
}

export type Basis2Like = {
  x: Vector2Like
  y: Vector2Like
}
