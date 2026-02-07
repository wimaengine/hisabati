import { TAU } from '../../constants'
import { invert, lerp } from '../../functions'

/**
 * This is a 2D vector class.
 *
 * /
 */
export class Vector2 {

  x!: number

  y!: number

  constructor(x: number = 0, y: number = 0) {
    this.set(x,y)
  }

  set(x: number, y: number): this {
    Vector2.set(x, y, this)

    return this
  }

  copy(v: Vector2): this {
    Vector2.copy(v, this)

    return this
  }

  clone(): Vector2 {
    return Vector2.copy(this)
  }

  splat(scalar: number): this {
    Vector2.splat(scalar, this)

    return this
  }

  magnitudeSquared(): number {
    return Vector2.magnitudeSquared(this)
  }

  magnitude(): number {
    return Vector2.magnitude(this)
  }

  distanceTo(v: Vector2): number {
    return Vector2.distanceTo(this, v)
  }

  distanceToSquared(v: Vector2): number {
    return Vector2.distanceToSquared(this, v)
  }

  normalize(): this {
    Vector2.normalize(this, this)

    return this
  }

  setMagnitude(length: number): this {
    Vector2.setMagnitude(this, length, this)

    return this
  }

  add(v: Vector2): this {
    Vector2.add(this, v, this)

    return this
  }

  addScalar(n: number): this {
    Vector2.addScalar(this, n, this)

    return this
  }

  subtract(v: Vector2): this {
    Vector2.subtract(this, v, this)

    return this
  }

  subtractScalar(n: number): this {
    Vector2.subtractScalar(this, n, this)

    return this
  }

  multiply(v: Vector2): this {
    Vector2.multiply(this, v, this)

    return this
  }

  multiplyScalar(s: number): this {
    Vector2.multiplyScalar(this, s, this)

    return this
  }

  divide(v: Vector2): this {
    Vector2.divide(this, v, this)

    return this
  }

  divideScalar(s: number): this {
    Vector2.divideScalar(this, s, this)

    return this
  }

  dot(v: Vector2): number {
    return Vector2.dot(this, v)
  }

  cross(v: Vector2): number {
    return Vector2.cross(this, v)
  }

  reverse(): this {
    Vector2.reverse(this, this)

    return this
  }

  invert(): this {
    Vector2.invert(this, this)

    return this
  }

  equals(v: Vector2): boolean {
    return Vector2.equal(this, v)
  }

  static set(x: number, y: number, out = new Vector2()): Vector2 {
    out.x = x
    out.y = y

    return out
  }

  static copy(v: Vector2, out = new Vector2()): Vector2 {
    out.x = v.x
    out.y = v.y

    return out
  }

  static splat(scalar: number, out = new Vector2()): Vector2 {
    return Vector2.set(scalar, scalar, out)
  }

  static magnitudeSquared(v: Vector2): number {
    return v.y ** 2 + v.x ** 2
  }

  static magnitude(v: Vector2): number {
    return Math.sqrt(Vector2.magnitudeSquared(v))
  }

  static distanceToSquared(v1: Vector2, v2: Vector2): number {
    const temp = new this(v1.x - v2.x, v1.y - v2.y)

    return this.magnitudeSquared(temp)
  }

  static distanceTo(v1: Vector2, v2: Vector2): number {
    const temp = new this(v1.x - v2.x, v1.y - v2.y)

    return this.magnitude(temp)
  }

  static normalize(v: Vector2, out = new Vector2()): Vector2 {
    const length = Vector2.magnitude(v)

    if (length === 0) return out

    out.x = v.x / length
    out.y = v.y / length

    return out
  }

  static setMagnitude(v: Vector2, length: number, out = new Vector2()): Vector2 {
    this.normalize(v, out)
    this.multiplyScalar(out, length, out)

    return out
  }

  static clampMagnitude(v: Vector2, min: number, max: number, out: Vector2): Vector2 {
    if (this.equal(v, this.Zero)) return this.copy(v, out)

    const length = this.magnitude(v)

    if (length > max) return this.multiplyScalar(v, max / length, out)
    if (length < min) return this.multiplyScalar(v, min / length, out)

    return this.copy(v, out)
  }

  static add(v1: Vector2, v2: Vector2, out = new Vector2()): Vector2 {
    out.x = v1.x + v2.x
    out.y = v1.y + v2.y

    return out
  }

  static addScalar(v1: Vector2, n: number, out = new Vector2()): Vector2 {
    out.x = v1.x + n
    out.y = v1.y + n

    return out
  }

  static subtract(from: Vector2, to: Vector2, out = new Vector2()): Vector2 {
    out.x = from.x - to.x
    out.y = from.y - to.y

    return out
  }

  static subtractScalar(v1: Vector2, n: number, out = new Vector2()): Vector2 {
    out.x = v1.x - n
    out.y = v1.y - n

    return out
  }

  static multiply(v1: Vector2, v2: Vector2, out = new Vector2()): Vector2 {
    out.x = v1.x * v2.x
    out.y = v1.y * v2.y

    return out
  }

  static multiplyScalar(v1: Vector2, n: number, out = new Vector2()): Vector2 {
    out.x = v1.x * n
    out.y = v1.y * n

    return out
  }

  static divide(v1: Vector2, v2: Vector2, out = new Vector2()): Vector2 {
    out.x = v1.x / v2.x
    out.y = v1.y / v2.y

    return out
  }

  static divideScalar(v1: Vector2, n: number, out = new Vector2()): Vector2 {
    return Vector2.multiplyScalar(v1, 1 / n, out)
  }

  static reverse(v: Vector2, out = new Vector2()): Vector2 {
    return Vector2.multiplyScalar(v, -1, out)
  }

  static invert(v: Vector2, out = new Vector2()): Vector2 {
    out.x = invert(v.x)
    out.y = invert(v.y)

    return out
  }

  static dot(v1: Vector2, v2: Vector2): number {
    return v1.x * v2.x + v1.y * v2.y
  }

  static cross(v1: Vector2, v2: Vector2): number {
    return v1.x * v2.y - v1.y * v2.x
  }

  static crossScalar(v1: Vector2, n: number, out = new Vector2()): Vector2 {
    out.x = v1.y * -n
    out.y = v1.x * n

    return out
  }

  static lerp(from: Vector2, to: Vector2, t: number, out = new Vector2()): Vector2 {
    out.x = lerp(from.x, to.x, t)
    out.y = lerp(from.y, to.y, t)

    return out
  }

  static reflect(v: Vector2, normal: Vector2, out = new Vector2()): Vector2 {
    const multiplier = this.dot(v, normal) * 2

    out.x = v.x - normal.x * multiplier
    out.y = v.y - normal.y * multiplier

    return out
  }

  static equal(v1: Vector2, v2: Vector2): boolean {
    return v1.x === v2.x && v1.y === v2.y
  }

  static normal(v: Vector2, out = new Vector2()): Vector2 {
    return Vector2.set(-v.y, v.x, out)
  }

  static rotate(v: Vector2, angle: number, out = new Vector2()): Vector2 {
    return Vector2.rotateFast(v, Math.cos(angle), Math.sin(angle), out)
  }

  static rotateFast(v: Vector2, cos: number, sin: number, out = new Vector2()): Vector2 {
    const { x } = v

    out.x = x * cos - v.y * sin
    out.y = x * sin + v.y * cos

    return out
  }

  static angleBetween(v1: Vector2, v2: Vector2): number {
    return Math.acos(this.dot(v1, v2) / (this.magnitude(v1) * this.magnitude(v2)))
  }

  static fromAngle(angle: number, out = new Vector2()): Vector2 {
    Vector2.set(Math.cos(angle), Math.sin(angle), out)

    return out
  }

  static toAngle(v: Vector2): number {
    const a = Math.atan2(v.y, v.x)

    return a < 0 ? TAU + a : a
  }

  static random(out = new Vector2()): Vector2 {
    return Vector2.fromAngle(Math.random() * TAU, out)
  }

  * [Symbol.iterator](): IterableIterator<number> {
    yield this.x
    yield this.y
  }

  /**
   * A vector whose x and y values will remain 0.
   *
   * /
   */
  static Zero = new Vector2()

  /**
   * A unit vector pointing in the x-axis.
   *
   * /
   */
  static X = new Vector2(1, 0)

  /**
   * A unit vector pointing in the y-axis.
   *
   * /
   */
  static Y = new Vector2(0, 1)

  /**
   * A unit vector pointing in the negative x-axis.
   *
   * /
   */
  static NegX = new Vector2(-1, 0)

  /**
   * A unit vector pointing in the nega y-axis.
   *
   * /
   */
  static NegY = new Vector2(0, -1)
}
