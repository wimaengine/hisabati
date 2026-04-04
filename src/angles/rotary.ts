import { TAU } from '../constants'
import { clamp, fuzzyEqual } from '../functions'
import { Matrix2 } from '../matrices'

export class Rotary {

  cos!: number

  sin!: number

  /**
   * Creates a rotary from cosine and sine.
   */
  constructor(cos: number = 1, sin: number = 0) {
    Rotary.set(cos, sin, this)
  }

  /**
   * Sets this rotary from cosine and sine.
   */
  set(cos: number, sin: number): this {
    Rotary.set(cos, sin, this)

    return this
  }

  /**
   * Copies another rotary into this one.
   */
  copy(v: Rotary): this {
    Rotary.copy(v, this)

    return this
  }

  /**
   * Creates a new rotary with the same components.
   */
  clone(): Rotary {
    return Rotary.copy(this)
  }

  /**
   * Returns the squared magnitude of this rotary.
   */
  magnitudeSquared(): number {
    return Rotary.magnitudeSquared(this)
  }

  /**
   * Returns the magnitude of this rotary.
   */
  magnitude(): number {
    return Rotary.magnitude(this)
  }

  /**
   * Normalizes this rotary in place.
   */
  normalize(): Rotary {
    return Rotary.normalize(this)
  }

  /**
   * Rotates this rotary by an angle.
   */
  rotate(angle: number): Rotary {
    return Rotary.rotate(angle, Rotary.copy(this))
  }

  /**
   * Multiplies this rotary by another.
   */
  multiply(rotary: Rotary): Rotary {
    return Rotary.multiply(this, rotary)
  }

  /**
   * Multiplies this rotary by a scalar.
   */
  multiplyScalar(scalar: number): Rotary {
    return Rotary.multiplyScalar(this, scalar)
  }

  /**
   * Computes the dot product with another rotary.
   */
  dot(rotary: Rotary): number {
    return Rotary.dot(this, rotary)
  }

  /**
   * Negates the sine component.
   */
  reverse(): Rotary {
    return Rotary.reverse(this)
  }

  /**
   * Checks component-wise equality.
   */
  equals(rotary: Rotary): boolean {
    return Rotary.equal(rotary, this)
  }

  /**
   * Creates or overwrites a rotary from cosine and sine.
   */
  static set(cos: number, sin: number, out = new Rotary()): Rotary {
    out.cos = cos
    out.sin = sin

    return out
  }

  /**
   * Copies a rotary into an output rotary.
   */
  static copy(rotary: Rotary, out = new Rotary()): Rotary {
    out.cos = rotary.cos
    out.sin = rotary.sin

    return out
  }

  /**
   * Writes the identity rotary.
   */
  static identity(out = new Rotary()): Rotary {
    out.cos = 1
    out.sin = 0

    return out
  }

  /**
   * Writes the zero rotary.
   */
  static zero(out = new Rotary()): Rotary {
    out.cos = 0
    out.sin = 0

    return out
  }

  /**
   * Computes the squared magnitude of a rotary.
   */
  static magnitudeSquared(q: Rotary): number {
    return q.cos * q.cos + q.sin * q.sin
  }

  /**
   * Computes the magnitude of a rotary.
   */
  static magnitude(q: Rotary): number {
    return Math.sqrt(this.magnitudeSquared(q))
  }

  /**
   * Normalizes a rotary.
   */
  static normalize(q: Rotary, out = new Rotary()): Rotary {
    const l = this.magnitude(q)

    if (l === 0) {
      this.identity(out)
    } else {
      const inv = 1 / l

      out.cos = q.cos * inv
      out.sin = q.sin * inv
    }

    return out
  }

  /**
   * Rotates a rotary by an angle.
   */
  static rotate(angle: number, out = new Rotary()): Rotary {
    const { cos: cosA, sin: sinA } = out
    const cosB = Math.cos(angle)
    const sinB = Math.sin(angle)

    out.cos = cosA * cosB - sinA * sinB
    out.sin = sinA * cosB + cosA * sinB

    return out
  }

  /**
   * Multiplies two rotaries.
   */
  static multiply(rotation1: Rotary, rotation2: Rotary, out = new Rotary()): Rotary {
    const { cos: cosA, sin: sinA } = rotation1
    const { cos: cosB, sin: sinB } = rotation2

    out.cos = cosA * cosB - sinA * sinB
    out.sin = sinA * cosB + cosA * sinB

    return out
  }

  /**
   * Multiplies a rotary by a scalar.
   */
  static multiplyScalar(rotation: Rotary, scalar: number, out = new Rotary()): Rotary {
    out.cos = rotation.cos * scalar
    out.sin = rotation.sin * scalar

    return out
  }

  /**
   * Negates the sine component of a rotary.
   */
  static reverse(rotation: Rotary, out = new Rotary()): Rotary {
    out.cos = -rotation.cos
    out.sin = -rotation.sin

    return out
  }

  /**
   * Computes the dot product between two rotaries.
   */
  static dot(a: Rotary, b: Rotary): number {
    return a.cos * b.cos + a.sin * b.sin
  }

  /**
   * Returns the angular distance between two rotaries.
   */
  static angleBetween(a: Rotary, b: Rotary): number {
    return 2 * Math.acos(Math.abs(clamp(Rotary.dot(a, b), -1, 1)))
  }

  /**
   * Builds a rotary from an angle.
   */
  static fromAngle(angle: number, out = new Rotary()): Rotary {
    out.cos = Math.cos(angle)
    out.sin = Math.sin(angle)

    return out
  }

  /**
   * Builds a rotary from a rotation matrix.
   */
  static fromRotationMatrix(matrix: Matrix2, out = new Rotary()): Rotary {
    out.cos = matrix.a
    out.sin = matrix.b

    return out
  }

  /**
   * Converts a rotary to an angle in radians.
   */
  static toAngle(out: Rotary): number {
    const angle = Math.acos(out.cos)

    if (out.sin >= 0) {
      return angle
    }

    return TAU - angle
  }

  /**
   * Spherically interpolates between two rotaries.
   */
  static slerp(a: Rotary, b: Rotary, t: number, out = new Rotary()): Rotary {
    const x = (a.cos + b.cos) * t
    const y = (a.sin + b.sin) * t
    const length = Math.sqrt(x * x + y * y)

    out.cos = x / length
    out.sin = y / length

    return out
  }

  /**
   * Checks component-wise equality for two rotaries.
   */
  static equal(rot1: Rotary, rot2: Rotary): boolean {
    return (
      rot1.cos === rot2.cos &&
      rot1.sin === rot2.sin
    )
  }

  /**
   * Checks approximate equality for two rotaries.
   */
  static fuzzyEqual(rot1: Rotary, rot2: Rotary, tolerance?: number): boolean {
    return (
      fuzzyEqual(rot1.cos, rot2.cos, tolerance) &&
      fuzzyEqual(rot1.sin, rot2.sin, tolerance)
    )
  }

  /**
   * Creates a uniformly random unit rotary.
   */
  static random(): Rotary {
    const angle = Math.random() * TAU

    return new Rotary(Math.cos(angle), Math.sin(angle))
  }

  /**
   * Iterates over rotary components in order.
   */
  * [Symbol.iterator](): IterableIterator<number> {
    yield this.cos
    yield this.sin
  }

  /**
   * The identity rotary.
   */
  static readonly Identity = Rotary.identity()

  /**
   * The zero rotary.
   */
  static readonly Zero = Rotary.zero()
}
