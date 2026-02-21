import { invert, lerp } from '../../functions'

export class Vector3 {

  x!: number

  y!: number

  z!: number

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.set(x,y,z)
  }

  set(x: number, y: number, z: number): this {
    Vector3.set(x, y, z, this)

    return this
  }

  copy(v: Vector3): this {
    Vector3.copy(v, this)

    return this
  }

  clone(): Vector3 {
    return Vector3.copy(this)
  }

  splat(scalar: number): this {
    Vector3.splat(scalar, this)

    return this
  }

  magnitudeSquared(): number {
    return Vector3.magnitudeSquared(this)
  }

  magnitude(): number {
    return Vector3.magnitude(this)
  }

  distanceTo(v: Vector3): number {
    return Vector3.distanceTo(this, v)
  }

  distanceToSquared(v: Vector3): number {
    return Vector3.distanceToSquared(this, v)
  }

  normalize(): this {
    Vector3.normalize(this, this)

    return this
  }

  setMagnitude(length: number): this {
    Vector3.setMagnitude(this, length, this)

    return this
  }

  add(v: Vector3): this {
    Vector3.add(this, v, this)

    return this
  }

  addScalar(n: number): this {
    Vector3.addScalar(this, n, this)

    return this
  }

  subtract(v: Vector3): this {
    Vector3.subtract(this, v, this)

    return this
  }

  subtractScalar(n: number): this {
    Vector3.subtractScalar(this, n, this)

    return this
  }

  multiply(v: Vector3): this {
    Vector3.multiply(this, v, this)

    return this
  }

  multiplyScalar(s: number): this {
    Vector3.multiplyScalar(this, s, this)

    return this
  }

  divide(v: Vector3): this {
    Vector3.divide(this, v, this)

    return this
  }

  divideScalar(s: number): this {
    Vector3.divideScalar(this, s, this)

    return this
  }

  dot(v: Vector3): number {
    return Vector3.dot(this, v)
  }

  cross(v: Vector3): this {
    Vector3.cross(this, v, this)

    return this
  }

  reverse(): this {
    Vector3.reverse(this, this)

    return this
  }

  invert(): this {
    Vector3.invert(this, this)

    return this
  }

  equals(v: Vector3): boolean {
    return Vector3.equal(this, v)
  }

  static set(x: number, y: number, z: number, out = new Vector3()): Vector3 {
    out.x = x
    out.y = y
    out.z = z

    return out
  }

  static copy(v1: Vector3, out = new Vector3()): Vector3 {
    out.x = v1.x
    out.y = v1.y
    out.z = v1.z

    return out
  }

  static splat(scalar: number, out = new Vector3()): Vector3 {
    out.x = scalar
    out.y = scalar
    out.z = scalar

    return out
  }

  static magnitudeSquared(v: Vector3): number {
    return v.x * v.x + v.y * v.y + v.z * v.z
  }

  static magnitude(v: Vector3): number {
    return Math.sqrt(Vector3.magnitudeSquared(v))
  }

  static distanceToSquared(v1: Vector3, v2: Vector3): number {
    const dx = v1.x - v2.x
    const dy = v1.y - v2.y
    const dz = v1.z - v2.z

    return dx * dx + dy * dy + dz * dz
  }

  static distanceTo(v1: Vector3, v2: Vector3): number {
    return Math.sqrt(Vector3.distanceToSquared(v1, v2))
  }

  static normalize(v: Vector3, out = new Vector3()): Vector3 {
    const length = this.magnitude(v) || 1

    this.divideScalar(v, length, out)

    return out
  }

  static setMagnitude(v: Vector3, length: number, out = new Vector3()): Vector3 {
    Vector3.normalize(v, out)
    Vector3.multiplyScalar(out, length, out)

    return out
  }

  static clampMagnitude(v: Vector3, min: number, max: number, out = new Vector3()): Vector3 {
    const length = Vector3.magnitude(v) || 1

    if (length < min) return Vector3.multiplyScalar(v, min / length, out)
    if (length > max) return Vector3.multiplyScalar(v, max / length, out)

    return Vector3.copy(v, out)
  }

  static add(v1: Vector3, v2: Vector3, out = new Vector3()): Vector3 {
    out.x = v1.x + v2.x
    out.y = v1.y + v2.y
    out.z = v1.z + v2.z

    return out
  }

  static addScalar(v1: Vector3, scalar: number, out = new Vector3()): Vector3 {
    out.x = v1.x + scalar
    out.y = v1.y + scalar
    out.z = v1.z + scalar

    return out
  }

  static subtract(from: Vector3, to: Vector3, out = new Vector3()): Vector3 {
    out.x = from.x - to.x
    out.y = from.y - to.y
    out.z = from.z - to.z

    return out
  }

  static subtractScalar(v1: Vector3, scalar: number, out = new Vector3()): Vector3 {
    out.x = v1.x - scalar
    out.y = v1.y - scalar
    out.z = v1.z - scalar

    return out
  }

  static multiply(v1: Vector3, v2: Vector3, out = new Vector3()): Vector3 {
    out.x = v1.x * v2.x
    out.y = v1.y * v2.y
    out.z = v1.z * v2.z

    return out
  }

  static multiplyScalar(v1: Vector3, scalar: number, out = new Vector3()): Vector3 {
    out.x = v1.x * scalar
    out.y = v1.y * scalar
    out.z = v1.z * scalar

    return out
  }

  static divide(v1: Vector3, v2: Vector3, out = new Vector3()): Vector3 {
    out.x = v1.x / v2.x
    out.y = v1.y / v2.y
    out.z = v1.z / v2.z

    return out
  }

  static divideScalar(v1: Vector3, scalar: number, out = new Vector3()): Vector3 {
    return Vector3.multiplyScalar(v1, 1 / scalar, out)
  }

  static reverse(v: Vector3, out = new Vector3()): Vector3 {
    out.x = -v.x
    out.y = -v.y
    out.z = -v.z

    return out
  }

  static invert(v: Vector3, out = new Vector3()): Vector3 {
    out.x = invert(v.x)
    out.y = invert(v.y)
    out.z = invert(v.z)

    return out
  }

  static dot(v1: Vector3, v2: Vector3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
  }

  static cross(a: Vector3, b: Vector3, out = new Vector3()): Vector3 {
    const ax = a.x
    const ay = a.y
    const az = a.z
    const bx = b.x
    const by = b.y
    const bz = b.z

    out.x = ay * bz - az * by
    out.y = az * bx - ax * bz
    out.z = ax * by - ay * bx

    return out
  }

  static lerp(from: Vector3, to: Vector3, t: number, out = new Vector3()): Vector3 {
    out.x = lerp(from.x, to.x, t)
    out.y = lerp(from.y, to.y, t)
    out.z = lerp(from.z, to.z, t)

    return out
  }

  static reflect(v: Vector3, normal: Vector3, out = new Vector3()): Vector3 {
    const multiplier = v.dot(normal) * 2

    out.x = v.x - normal.x * multiplier
    out.y = v.y - normal.y * multiplier
    out.z = v.z - normal.z * multiplier

    return out
  }

  static angleBetween(v1: Vector3, v2: Vector3): number {
    return Math.acos(v1.dot(v1) / (v1.magnitude() * v2.magnitude()))
  }

  static equal(v1: Vector3, v2: Vector3): boolean {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z
  }

  static random(out = new Vector3()): Vector3 {
    const theta = Math.random() * Math.PI * 2
    const u = Math.random() * 2 - 1
    const c = Math.sqrt(1 - u * u)

    out.x = c * Math.cos(theta)
    out.y = u
    out.z = c * Math.sin(theta)

    return out
  }

  * [Symbol.iterator](): IterableIterator<number> {
    yield this.x
    yield this.y
    yield this.z
  }

  /**
   * A vector whose x and y values will remain 0.
   *
   * /
   */
  static readonly Zero = new Vector3()

  /**
   * Unit vector pointing in the x-axis.
   *
   * /
   */
  static X = new Vector3(1, 0, 0)

  /**
   * Unit vector pointing in the y-axis.
   *
   * /
   */
  static Y = new Vector3(0, 1, 0)

  /**
   * Unit vector pointing in the z-axis.
   *
   * /
   */
  static Z = new Vector3(0, 0, 1)

  /**
   * Unit vector pointing in the negative x-axis.
   *
   * /
   */
  static NegX = new Vector3(-1, 0, 0)

  /**
   * Unit vector pointing in the negative y-axis.
   *
   * /
   */
  static NegY = new Vector3(0, -1, 0)

  /**
   * Unit vector pointing in the negative z-axis.
   *
   * /
   */
  static NegZ = new Vector3(0, 0, -1)
}
