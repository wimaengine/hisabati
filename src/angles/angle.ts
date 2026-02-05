import { lerp } from '../functions'

/**
 * Wrapper class since JavaScript doesn't support references to numbers explicitly.
 * Keeps record of the orientation of an entity.
 * /
 */
export class Angle {

  /**
   * Orientation in radians.
   *
   * /
   */
  value = 0

  constructor(rad: number = 0) {
    this.value = rad
  }

  static lerp(a: Angle, b: Angle, t: number, out: Angle): void {
    out.value = lerp(a.value, b.value, t)
  }

  static copy(angle: Angle, out = new Angle()): Angle {
    out.value = angle.value

    return out
  }
}
