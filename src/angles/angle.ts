import { lerp } from '../interpolation'

/**
 * Wrapper class since JavaScript doesn't support references to numbers explicitly.
 */
export class Angle {

  /**
   * Orientation in radians.
   *
   */
  value = 0

  /**
   * Creates an angle in radians.
   */
  constructor(rad: number = 0) {
    this.value = rad
  }

  /**
   * Serializes this angle.
   */
  serialize(): AngleLike {
    return Angle.serialize(this)
  }

  /**
   * Linearly interpolates between two angles.
   */
  static lerp(a: Angle, b: Angle, t: number, out: Angle): void {
    out.value = lerp(a.value, b.value, t)
  }

  /**
   * Copies an angle into an output angle.
   */
  static copy(angle: Angle, out = new Angle()): Angle {
    out.value = angle.value

    return out
  }

  /**
   * Serializes an angle to a number.
   */
  static serialize(value: Angle): AngleLike {
    return value.value
  }

  /**
   * Deserializes an angle from a number.
   */
  static deserialize(value: AngleLike, out = new Angle()): Angle {
    out.value = value

    return out
  }

  /**
   * Checks whether a value is a valid angle serial.
   */
  static validateSerial(value: unknown): value is AngleLike {
    return typeof value === 'number'
  }
}

export type AngleLike = number
