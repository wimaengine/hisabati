import { Rotary } from '../angles'
import { Vector2 } from '../vectors'

/**
 * Represents a 2x3 affine.
 * Can be used to represent 2 dimensional rotation, scale, skew and translation.
 *
 * Matrix layout:
 * | a | c | x |
 * | b | d | y |
 */
export class Affine2 {

  a!: number

  b!: number

  c!: number

  d!: number

  x!: number

  y!: number

  constructor(e11 = 1, e12 = 0, e13 = 0, e21 = 0, e22 = 1, e23 = 0) {
    Affine2.set(e11, e12, e13, e21, e22, e23, this)
  }

  /**
   * Sets this affine from raw matrix components.
   */
  set(e11: number, e12: number, e13: number, e21: number, e22: number, e23: number):this {
    Affine2.set(e11, e12, e13, e21, e22, e23, this)

    return this
  }

  /**
   * Copies another affine into this one.
   */
  copy(affine: Affine2):this {
    Affine2.copy(affine, this)

    return this
  }

  /**
   * Creates a new affine with the same components.
   */
  clone():Affine2 {
    return new Affine2().copy(this)
  }

  /**
   * Composes this affine from translation, orientation and scale.
   */
  compose(translation: Vector2, orientation: Rotary, scale: Vector2):this {
    Affine2.compose(translation, orientation, scale, this)

    return this
  }

  /**
   * Decomposes this affine into translation, orientation and scale.
   */
  decompose(): [Vector2,Rotary,Vector2] {
    return Affine2.decompose(this)
  }

  /**
   * Applies a translation to this affine.
   */
  translate(translation: Vector2):this {
    Affine2.translate(this, translation, this)

    return this
  }

  /**
   * Applies a rotation to this affine.
   */
  rotate(angle: Rotary):this {
    Affine2.rotate(this, angle, this)

    return this
  }

  /**
   * Applies a scale to this affine.
   */
  scale(scale: Vector2):this {
    Affine2.scale(this, scale, this)

    return this
  }

  /**
   * Orients this affine to face a target position.
   */
  lookAt(target: Vector2):this {
    const eye = new Vector2(this.x, this.y)

    Affine2.lookAt(eye, target, this)

    return this
  }

  /**
   * Transforms a vector by this affine in place.
   */
  transform(vector: Vector2): Vector2 {
    return Affine2.transform(this, vector, vector)
  }

  /**
   * Inverts this affine in place.
   */
  invert(): this {
    Affine2.invert(this, this)

    return this
  }

  /**
   * Multiplies this affine by another (this = this * affine).
   */
  multiply(affine: Affine2): this {
    Affine2.multiply(this, affine, this)

    return this
  }

  /**
   * Divides this affine by another (this = this * inverse(affine)).
   */
  divide(affine: Affine2): this {
    Affine2.divide(this, affine, this)

    return this
  }

  /**
   * Checks component-wise equality.
   */
  equals(affine: Affine2):boolean {
    return Affine2.equal(this, affine)
  }

  /**
   * Creates or overwrites an affine with raw matrix components.
   */
  static set(e11: number, e12: number, e13: number, e21: number, e22: number, e23: number, out = new Affine2()) {
    out.a = e11
    out.b = e21
    out.c = e12
    out.d = e22
    out.x = e13
    out.y = e23

    return out
  }

  /**
   * Copies an affine into an output affine.
   */
  static copy(affine: Affine2, out = new Affine2()):Affine2 {
    out.a = affine.a
    out.b = affine.b
    out.c = affine.c
    out.d = affine.d
    out.x = affine.x
    out.y = affine.y

    return out
  }

  /**
   * Writes the identity transform.
   */
  static identity(out = new Affine2()):Affine2 {
    this.set(1, 0, 0, 0, 1, 0, out)

    return out
  }

  /**
   * Writes the zero transform.
   */
  static zero(out = new Affine2()):Affine2 {
    this.set(0, 0, 0, 0, 0, 0, out)

    return out
  }

  /**
   * Composes an affine from translation, rotation and scale.
   */
  static compose(translation: Vector2, orientation: Rotary, scale: Vector2, affine = new Affine2()):Affine2 {
    const { cos, sin } = orientation

    affine.a = cos * scale.x
    affine.b = sin * scale.x
    affine.c = -sin * scale.y
    affine.d = cos * scale.y
    affine.x = translation.x
    affine.y = translation.y

    return affine
  }

  /**
   * Decomposes an affine into translation, rotation and scale.
   */
  static decompose(
    affine: Affine2,
    position = new Vector2(),
    orientation = new Rotary(),
    scale = new Vector2()
  ):[Vector2,Rotary,Vector2] {
    const scaleX = new Vector2(affine.a, affine.b).magnitude()
    const scaleY = new Vector2(affine.c, affine.d).magnitude()

    position.x = affine.x
    position.y = affine.y

    orientation.cos = affine.a / scaleX
    orientation.sin = affine.b / scaleX

    scale.x = scaleX
    scale.y = scaleY

    return [position, orientation, scale]
  }

  /**
   * Multiplies two affines (out = affine1 * affine2).
   */
  static multiply(affine1: Affine2, affine2: Affine2, out = new Affine2()): Affine2{
    const { a: a1, b: b1, c: c1, d: d1, x: x1, y: y1 } = affine1
    const { a: a2, b: b2, c: c2, d: d2, x: x2, y: y2 } = affine2

    out.a = a2 * a1 + b2 * c1
    out.b = a2 * b1 + b2 * d1
    out.c = c2 * a1 + d2 * c1
    out.d = c2 * b1 + d2 * d1
    out.x = x2 * a1 + y2 * c1 + x1
    out.y = x2 * b1 + y2 * d1 + y1

    return out
  }

  /**
   * Divides two affines (out = affine1 * inverse(affine2)).
   */
  static divide(affine1: Affine2, affine2: Affine2, out = new Affine2()):Affine2 {
    const multiplier = this.invert(affine2)

    this.multiply(affine1, multiplier, out)

    return out
  }

  /**
   * Inverts an affine.
   */
  static invert(affine: Affine2, out = new Affine2()):Affine2 {
    const { a, b, c, d, x, y } = affine
    const det = a * d - b * c
    const invDet = 1 / det

    if (det === 0) return this.zero(out)

    out.a = d * invDet
    out.b = -b * invDet
    out.c = -c * invDet
    out.d = a * invDet
    out.x = (c * y - d * x) * det
    out.y = -(a * y - b * x) * det

    return out
  }

  /**
   * Translates an affine.
   */
  static translate(affine: Affine2, translation: Vector2, out = new Affine2()):Affine2 {
    out.a = affine.a
    out.b = affine.b
    out.c = affine.c
    out.d = affine.d
    out.x = affine.x + translation.x
    out.y = affine.y + translation.y

    return out
  }

  /**
   * Rotates an affine by a rotary angle.
   */
  static rotate(affine: Affine2, rotary: Rotary, out = new Affine2()): Affine2 {
    const { a, b, c, d, x, y } = affine
    const { cos, sin } = rotary

    out.a = a * cos - b * sin
    out.b = a * sin + b * cos
    out.c = c * cos - d * sin
    out.d = c * sin + d * cos
    out.x = x * cos - y * sin
    out.y = x * sin + y * cos

    return out
  }

  /**
   * Scales an affine by per-axis factors.
   */
  static scale(affine: Affine2, scale: Vector2, out = new Affine2()): Affine2 {
    out.a = affine.a * scale.x
    out.b = affine.b * scale.x
    out.c = affine.c * scale.y
    out.d = affine.d * scale.y
    out.x = affine.x
    out.y = affine.y

    return out
  }

  /**
   * Creates a look-at transform from eye to target.
   */
  static lookAt(eye: Vector2, target: Vector2, out = new Affine2()):Affine2 {
    const y = Vector2.subtract(target, eye)

    if (Vector2.magnitudeSquared(y) === 0) {
      y.x = 1
    }

    Vector2.normalize(y, y)

    out.a = y.x
    out.b = y.y
    out.c = -y.y
    out.d = y.x
    out.x = eye.y
    out.y = eye.y

    return out
  }

  /**
   * Transforms a vector by an affine.
   */
  static transform(affine: Affine2, v: Vector2, out = new Vector2()):Vector2 {
    const { a, b, c, d, x, y } = affine
    const { x: vx, y: vy } = v

    out.x = a * vx + c * vy + x
    out.y = b * vx + d * vy + y

    return out
  }

  /**
   * Checks component-wise equality for two affines.
   */
  static equal(affine1: Affine2, affine2: Affine2):boolean {
    return (
      (affine1.a === affine2.a) &&
      (affine1.b === affine2.b) &&
      (affine1.c === affine2.c) &&
      (affine1.d === affine2.d) &&
      (affine1.x === affine2.x) &&
      (affine1.y === affine2.y)
    )
  }

  /**
   * Iterates over the affine components in row-major order.
   */
  * [Symbol.iterator](): IterableIterator<number> {
    yield this.a
    yield this.b
    yield this.c
    yield this.d
    yield this.x
    yield this.y
  }

  /**
   * The identity affine.
   */
  static readonly Identity = Affine2.identity()

  /**
   * The zero affine.
   */
  static readonly Zero = Affine2.zero()
}
