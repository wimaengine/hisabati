import { lerp } from '../functions'

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
}
