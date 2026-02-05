import { TAU } from '../constants'
import { clamp, fuzzyEqual } from '../functions'
import { Matrix2 } from '../matrices'

export class Rotary {

  cos!: number

  sin!: number

  constructor(cos: number = 1, sin: number = 0) {
    this.set(cos, sin)
  }

  set(cos: number, sin: number): this {
    Rotary.set(cos, sin, this)

    return this
  }

  copy(v: Rotary): this {
    Rotary.copy(v, this)

    return this
  }

  clone(): Rotary {
    return Rotary.copy(this)
  }

  magnitudeSquared(): number {
    return Rotary.magnitudeSquared(this)
  }

  magnitude(): number {
    return Rotary.magnitude(this)
  }

  normalize(): this {
    Rotary.normalize(this, this)

    return this
  }

  rotate(angle: number): this {
    Rotary.rotate(angle, this)

    return this
  }

  multiply(rotary: Rotary): this {
    Rotary.multiply(rotary, this, this)

    return this
  }

  multiplyScalar(scalar: number): this {
    Rotary.multiplyScalar(this, scalar, this)

    return this
  }

  dot(rotary: Rotary): number {
    return Rotary.dot(this, rotary)
  }

  reverse(): this {
    Rotary.reverse(this, this)

    return this
  }

  equals(rotary: Rotary): boolean {
    return Rotary.equal(rotary, this)
  }

  static set(cos: number, sin: number, out = new Rotary()): Rotary {
    out.cos = cos
    out.sin = sin

    return out
  }

  static copy(rotary: Rotary, out = new Rotary()): Rotary {
    out.cos = rotary.cos
    out.sin = rotary.sin

    return out
  }

  static identity(out = new Rotary()): Rotary {
    out.cos = 1
    out.sin = 0

    return out
  }

  static zero(out = new Rotary()): Rotary {
    out.cos = 0
    out.sin = 0

    return out
  }

  static magnitudeSquared(q: Rotary): number {
    return q.cos * q.cos + q.sin * q.sin
  }

  static magnitude(q: Rotary): number {
    return Math.sqrt(this.magnitudeSquared(q))
  }

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

  static rotate(angle: number, out = new Rotary()): Rotary {
    const { cos: cosA, sin: sinA } = out
    const cosB = Math.cos(angle)
    const sinB = Math.sin(angle)

    out.cos = cosA * cosB - sinA * sinB
    out.sin = sinA * cosB + cosA * sinB

    return out
  }

  static multiply(rotation1: Rotary, rotation2: Rotary, out = new Rotary()): Rotary {
    const { cos: cosA, sin: sinA } = rotation1
    const { cos: cosB, sin: sinB } = rotation2

    out.cos = cosA * cosB - sinA * sinB
    out.sin = sinA * cosB + cosA * sinB

    return out
  }

  static multiplyScalar(rotation: Rotary, scalar: number, out = new Rotary()): Rotary {
    out.cos = rotation.cos * scalar
    out.sin = rotation.sin * scalar

    return out
  }

  static reverse(rotation: Rotary, out = new Rotary()): Rotary {
    out.cos = -rotation.cos
    out.sin = -rotation.sin

    return out
  }

  static dot(a: Rotary, b: Rotary): number {
    return a.cos * b.cos + a.sin * b.sin
  }

  static angleBetween(a: Rotary, b: Rotary): number {
    return 2 * Math.acos(Math.abs(clamp(Rotary.dot(a, b), -1, 1)))
  }

  static fromAngle(angle: number, out = new Rotary()): Rotary {
    out.cos = Math.cos(angle)
    out.sin = Math.sin(angle)

    return out
  }

  static fromRotationMatrix(matrix: Matrix2, out = new Rotary()): Rotary {
    out.cos = matrix.a
    out.sin = matrix.b

    return out
  }

  static toAngle(out: Rotary): number {
    const angle = Math.acos(out.cos)

    if (out.sin >= 0) {
      return angle
    }

    return TAU - angle
  }

  static slerp(a: Rotary, b: Rotary, t: number, out = new Rotary()): Rotary {
    const x = (a.cos + b.cos) * t
    const y = (a.sin + b.sin) * t
    const length = Math.sqrt(x * x + y * y)

    out.cos = x / length
    out.sin = y / length

    return out
  }

  static equal(rot1: Rotary, rot2: Rotary): boolean {
    return (
      rot1.cos === rot2.cos &&
      rot1.sin === rot2.sin
    )
  }

  static fuzzyEqual(rot1: Rotary, rot2: Rotary, tolerance?: number): boolean {
    return (
      fuzzyEqual(rot1.cos, rot2.cos, tolerance) &&
      fuzzyEqual(rot1.sin, rot2.sin, tolerance)
    )
  }

  static random(): Rotary {
    const angle = Math.random() * TAU

    return new Rotary(Math.cos(angle), Math.sin(angle))
  }

  * [Symbol.iterator](): IterableIterator<number> {
    yield this.cos
    yield this.sin
  }

  static readonly Identity = Rotary.identity()

  static readonly Zero = Rotary.zero()
}
