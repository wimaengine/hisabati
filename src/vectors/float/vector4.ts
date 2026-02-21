import { invert, lerp } from '../../functions'

export class Vector4 {

  x!: number

  y!: number

  z!: number

  w!: number

  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    this.set(x,y,z,w)
  }

  set(x: number, y: number, z: number, w: number): this {
    Vector4.set(x, y, z, w, this)

    return this
  }

  copy(v: Vector4): this {
    Vector4.copy(v, this)

    return this
  }

  clone(): Vector4 {
    return Vector4.copy(this)
  }

  splat(scalar: number): this {
    Vector4.splat(scalar, this)

    return this
  }

  magnitudeSquared(): number {
    return Vector4.magnitudeSquared(this)
  }

  magnitude(): number {
    return Vector4.magnitude(this)
  }

  distanceTo(v: Vector4): number {
    return Vector4.distanceTo(this, v)
  }

  distanceToSquared(v: Vector4): number {
    return Vector4.distanceToSquared(this, v)
  }

  normalize(): this {
    Vector4.normalize(this, this)

    return this
  }

  setMagnitude(length: number): this {
    Vector4.setMagnitude(this, length, this)

    return this
  }

  add(v: Vector4): this {
    Vector4.add(this, v, this)

    return this
  }

  addScalar(n: number): this {
    Vector4.addScalar(this, n, this)

    return this
  }

  subtract(v: Vector4): this {
    Vector4.subtract(this, v, this)

    return this
  }

  subtractScalar(n: number): this {
    Vector4.subtractScalar(this, n, this)

    return this
  }

  multiply(v: Vector4): this {
    Vector4.multiply(this, v, this)

    return this
  }

  multiplyScalar(s: number): this {
    Vector4.multiplyScalar(this, s, this)

    return this
  }

  divide(v: Vector4): this {
    Vector4.divide(this, v, this)

    return this
  }

  divideScalar(s: number): this {
    Vector4.divideScalar(this, s, this)

    return this
  }

  dot(v: Vector4): number {
    return Vector4.dot(this, v)
  }

  reverse(): this {
    Vector4.reverse(this, this)

    return this
  }

  invert(): this {
    Vector4.invert(this, this)

    return this
  }

  equals(v: Vector4): boolean {
    return Vector4.equal(this, v)
  }

  static set(x: number, y: number, z: number, w: number, out = new Vector4()): Vector4 {
    out.x = x
    out.y = y
    out.z = z
    out.w = w

    return out

  }

  static copy(v: Vector4, out = new Vector4()): Vector4 {
    out.x = v.x
    out.y = v.y
    out.z = v.z
    out.w = v.w

    return out
  }

  static splat(scalar: number, out = new Vector4()): Vector4 {
    out.x = scalar
    out.y = scalar
    out.z = scalar
    out.w = scalar

    return out
  }

  static magnitudeSquared(v: Vector4): number {
    return v.x * v.x + v.y * v.y + v.z * v.z + v.w * v.w
  }

  static magnitude(v: Vector4): number {
    return Math.sqrt(Vector4.magnitudeSquared(v))
  }

  static distanceToSquared(v1: Vector4, v2: Vector4): number {
    const dx = v1.x - v2.x
    const dy = v1.y - v2.y
    const dz = v1.z - v2.z
    const dw = v1.w - v2.w

    return dx * dx + dy * dy + dz * dz + dw * dw
  }

  static distanceTo(v1: Vector4, v2: Vector4): number {
    return Math.sqrt(Vector4.distanceToSquared(v1, v2))
  }

  static normalize(v: Vector4, out = new Vector4()): Vector4 {
    const length = this.magnitude(v) || 1

    return this.divideScalar(v, length, out)
  }

  static setMagnitude(v: Vector4, length: number, out = new Vector4()): Vector4 {
    this.normalize(v, out)
    this.multiplyScalar(out, length, out)

    return out
  }

  static clampMagnitude(v: Vector4, min: number, max: number, out = new Vector4()): Vector4 {
    const length = this.magnitude(v) || 1

    if (length < min) return this.multiplyScalar(v, min / length, out)
    if (length > max) return this.multiplyScalar(v, max / length, out)

    return this.copy(v, out)
  }

  static add(a: Vector4, b: Vector4, out = new Vector4()): Vector4 {
    out.x = a.x + b.x
    out.y = a.y + b.y
    out.z = a.z + b.z
    out.w = a.w + b.w

    return out

  }

  static addScalar(v: Vector4, s: number, out = new Vector4()): Vector4 {

    out.x = v.x + s
    out.y = v.y + s
    out.z = v.z + s
    out.w = v.w + s

    return out
  }

  static subtract(a: Vector4, b: Vector4, out = new Vector4()): Vector4 {
    out.x = a.x - b.x
    out.y = a.y - b.y
    out.z = a.z - b.z
    out.w = a.w - b.w

    return out
  }

  static subtractScalar(v: Vector4, s: number, out = new Vector4()): Vector4 {
    out.x = v.x - s
    out.y = v.y - s
    out.z = v.z - s
    out.w = v.w - s

    return out
  }

  static multiply(a: Vector4, b: Vector4, out = new Vector4()): Vector4 {
    out.x = a.x * b.x
    out.y = a.y * b.y
    out.z = a.z * b.z
    out.w = a.w * b.w

    return out
  }

  static multiplyScalar(v: Vector4, s: number, out = new Vector4()): Vector4 {
    out.x = v.x * s
    out.y = v.y * s
    out.z = v.z * s
    out.w = v.w * s

    return out
  }

  static divide(a: Vector4, b: Vector4, out = new Vector4()): Vector4 {
    out.x = a.x / b.x
    out.y = a.y / b.y
    out.z = a.z / b.z
    out.w = a.w / b.w

    return out
  }

  static divideScalar(v: Vector4, scalar: number, out = new Vector4()): Vector4 {
    return Vector4.multiplyScalar(v, 1 / scalar, out)
  }

  static reverse(v: Vector4, out = new Vector4()): Vector4 {
    out.x = -v.x
    out.y = -v.y
    out.z = -v.z
    out.w = -v.w

    return out
  }

  static invert(v: Vector4, out = new Vector4()): Vector4 {
    out.x = invert(v.x)
    out.y = invert(v.y)
    out.z = invert(v.z)
    out.w = invert(v.w)

    return out
  }

  static dot(a: Vector4, b: Vector4): number {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w
  }

  static lerp(from: Vector4, to: Vector4, t: number, out = new Vector4()): Vector4 {
    out.x = lerp(from.x, to.x, t)
    out.y = lerp(from.y, to.y, t)
    out.z = lerp(from.z, to.z, t)
    out.w = lerp(from.w, to.w, t)

    return out
  }

  static reflect(v: Vector4, normal: Vector4, out = new Vector4()): Vector4 {
    const multiplier = v.dot(normal) * 2

    out.x = v.x - normal.x * multiplier
    out.y = v.y - normal.y * multiplier
    out.z = v.z - normal.z * multiplier
    out.w = v.w - normal.w * multiplier

    return out
  }

  static equal(a: Vector4, b: Vector4): boolean {
    return (
      (a.x === b.x) &&
      (a.y === b.y) &&
      (a.z === b.z) &&
      (a.w === b.w)
    )
  }

  static random(out = new Vector4()): Vector4 {
    out.x = Math.random()
    out.y = Math.random()
    out.z = Math.random()
    out.w = Math.random()

    return out
  }

  * [Symbol.iterator](): IterableIterator<number> {
    yield this.x
    yield this.y
    yield this.z
    yield this.w
  }

  /**
   * A vector whose components values will remain 0.
   *
   * /
   */
  static readonly Zero = new Vector4()

  /**
   * Unit vector pointing in the x-axis.
   *
   * /
   */
  static X = new Vector4(1, 0, 0, 0)

  /**
   * Unit vector pointing in the y-axis.
   *
   * /
   */
  static Y = new Vector4(0, 1, 0, 0)

  /**
   * Unit vector pointing in the z-axis.
   *
   * /
   */
  static Z = new Vector4(0, 0, 1, 0)

  /**
   * Unit vector pointing in the negative w-axis.
   *
   * /
   */
  static W = new Vector4(0, 0, 0, 1)

  /**
   * Unit vector pointing in the negative x-axis.
   *
   * /
   */
  static NegX = new Vector4(-1, 0, 0, 0)

  /**
   * Unit vector pointing in the negative y-axis.
   *
   * /
   */
  static NegY = new Vector4(0, -1, 0, 0)

  /**
   * Unit vector pointing in the negative z-axis.
   *
   * /
   */
  static NegZ = new Vector4(0, 0, -1, 0)

  /**
   * Unit vector pointing in the negative w-axis.
   *
   * /
   */
  static NegW = new Vector4(0, 0, 0, -1)
}
