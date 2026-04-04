import { clamp, fuzzyEqual } from '../functions'
import { Matrix3 } from '../matrices'
import { Vector3 } from '../vectors'

export class Quaternion {

  x!: number

  y!: number

  z!: number

  w!: number

  /**
   * Creates a quaternion from components.
   */
  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
    Quaternion.set(x, y, z, w, this)
  }

  /**
   * Sets this quaternion from components.
   */
  set(x: number, y: number, z: number, w: number): this {
    Quaternion.set(x, y, z, w, this)

    return this
  }

  /**
   * Copies another quaternion into this one.
   */
  copy(quaternion: Quaternion): this {
    Quaternion.copy(quaternion, this)

    return this
  }

  /**
   * Creates a new quaternion with the same components.
   */
  clone(): Quaternion {
    return new Quaternion().copy(this)
  }

  /**
   * Negates the vector part of this quaternion.
   */
  reverse(): Quaternion {
    return Quaternion.reverse(this)
  }

  /**
   * Computes the dot product with another quaternion.
   */
  dot(v: Quaternion): number {
    return Quaternion.dot(this, v)
  }

  /**
   * Returns the squared magnitude of this quaternion.
   */
  magnitudeSquared(): number {
    return Quaternion.magnitudeSquared(this)
  }

  /**
   * Returns the magnitude of this quaternion.
   */
  magnitude(): number {
    return Quaternion.magnitude(this)
  }

  /**
   * Normalizes this quaternion in place.
   */
  normalize(): Quaternion {
    return Quaternion.normalize(this)
  }

  /**
   * Multiplies this quaternion by another.
   */
  multiply(q: Quaternion): Quaternion {
    return Quaternion.multiply(this, q)
  }

  /**
   * Applies an X-axis rotation to this quaternion.
   */
  rotateX(angle: number): Quaternion {
    return Quaternion.rotateX(angle, Quaternion.copy(this))
  }

  /**
   * Applies a Y-axis rotation to this quaternion.
   */
  rotateY(angle: number): Quaternion {
    return Quaternion.rotateY(angle, Quaternion.copy(this))
  }

  /**
   * Applies a Z-axis rotation to this quaternion.
   */
  rotateZ(angle: number): Quaternion {
    return Quaternion.rotateZ(angle, Quaternion.copy(this))
  }

  /**
   * Checks component-wise equality.
   */
  equals(quaternion: Quaternion): boolean {
    return Quaternion.equal(this, quaternion)
  }

  /**
   * Creates or overwrites a quaternion from components.
   */
  static set(x: number, y: number, z: number, w: number, out = new Quaternion()): Quaternion {
    out.x = x
    out.y = y
    out.z = z
    out.w = w

    return out
  }

  /**
   * Copies a quaternion into an output quaternion.
   */
  static copy(from: Quaternion, to = new Quaternion()): Quaternion {
    to.x = from.x
    to.y = from.y
    to.z = from.z
    to.w = from.w

    return to
  }

  /**
   * Writes the identity quaternion.
   */
  static identity(out = new Quaternion()): Quaternion {
    out.x = 0
    out.y = 0
    out.z = 0
    out.w = 1

    return out
  }

  /**
   * Writes the zero quaternion.
   */
  static zero(out = new Quaternion()): Quaternion {
    out.x = 0
    out.y = 0
    out.z = 0
    out.w = 0

    return out
  }

  /**
   * Computes the squared magnitude of a quaternion.
   */
  static magnitudeSquared(q: Quaternion): number {
    return q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w
  }

  /**
   * Computes the magnitude of a quaternion.
   */
  static magnitude(q: Quaternion): number {
    return Math.sqrt(this.magnitudeSquared(q))
  }

  /**
   * Normalizes a quaternion.
   */
  static normalize(q: Quaternion, out = new Quaternion()): Quaternion {
    const l = this.magnitude(q)

    if (l === 0) {
      this.identity(out)
    } else {
      const inv = 1 / l

      out.x = q.x * inv
      out.y = q.y * inv
      out.z = q.z * inv
      out.w = q.w * inv
    }

    return out
  }

  /**
   * Applies an X-axis rotation to a quaternion.
   */
  static rotateX(angle: number, out = new Quaternion()): Quaternion {
    const halfAngle = angle * 0.5

    const ax = out.x
    const ay = out.y
    const az = out.z
    const aw = out.w

    const bx = Math.sin(halfAngle)
    const bw = Math.cos(halfAngle)

    return this.set(
      ax * bw + aw * bx,
      ay * bw + az * bx,
      az * bw - ay * bx,
      aw * bw - ax * bx,
      out
    )
  }

  /**
   * Applies a Y-axis rotation to a quaternion.
   */
  static rotateY(angle: number, out = new Quaternion()): Quaternion {
    const halfAngle = angle * 0.5

    const ax = out.x
    const ay = out.y
    const az = out.z
    const aw = out.w

    const by = Math.sin(halfAngle)
    const bw = Math.cos(halfAngle)

    return this.set(
      ax * bw - az * by,
      ay * bw + aw * by,
      az * bw + ax * by,
      aw * bw - ay * by,
      out
    )
  }

  /**
   * Applies a Z-axis rotation to a quaternion.
   */
  static rotateZ(angle: number, out = new Quaternion()): Quaternion {
    const halfAngle = angle * 0.5

    const ax = out.x
    const ay = out.y
    const az = out.z
    const aw = out.w

    const bz = Math.sin(halfAngle)
    const bw = Math.cos(halfAngle)

    return this.set(
      ax * bw + ay * bz,
      ay * bw - ax * bz,
      az * bw + aw * bz,
      aw * bw - az * bz,
      out
    )
  }

  /**
   * Multiplies two quaternions.
   */
  static multiply(a: Quaternion, b: Quaternion, out = new Quaternion()): Quaternion {
    const qax = a.x
    const qay = a.y
    const qaz = a.z
    const qaw = a.w
    const qbx = b.x
    const qby = b.y
    const qbz = b.z
    const qbw = b.w

    out.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby
    out.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz
    out.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx
    out.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz

    return out
  }

  /**
   * Multiplies a quaternion by a scalar.
   */
  static multiplyScalar(q: Quaternion, s: number, out = new Quaternion()): Quaternion {
    out.x = q.x * s
    out.y = q.y * s
    out.z = q.z * s
    out.w = q.w * s

    return out
  }

  /**
   * Negates the vector part of a quaternion.
   */
  static reverse(a: Quaternion, out = new Quaternion()): Quaternion {
    out.x = -a.x
    out.y = -a.y
    out.z = -a.z
    out.w = a.w

    return out
  }

  /**
   * Computes the dot product between two quaternions.
   */
  static dot(q1: Quaternion, q2: Quaternion): number {
    return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w
  }

  /**
   * Returns the angular distance between two quaternions.
   */
  static angleBetween(a: Quaternion, b: Quaternion): number {
    return 2 * Math.acos(Math.abs(clamp(a.dot(b), -1, 1)))
  }

  /**
   * Builds a quaternion from Euler angles.
   */
  static fromEuler(x: number, y: number, z: number, out = new Quaternion()): Quaternion {
    const c1 = Math.cos(x / 2)
    const c2 = Math.cos(y / 2)
    const c3 = Math.cos(z / 2)

    const s1 = Math.sin(x / 2)
    const s2 = Math.sin(y / 2)
    const s3 = Math.sin(z / 2)

    out.x = s1 * c2 * c3 + c1 * s2 * s3
    out.y = c1 * s2 * c3 - s1 * c2 * s3
    out.z = c1 * c2 * s3 + s1 * s2 * c3
    out.w = c1 * c2 * c3 - s1 * s2 * s3

    return out
  }

  /**
   * Builds a quaternion from a rotation matrix.
   */
  static fromRotationMatrix(matrix: Matrix3, out = new Quaternion()): Quaternion {
    const
      m11 = matrix.a,
      m12 = matrix.d,
      m13 = matrix.g,
      m21 = matrix.b,
      m22 = matrix.e,
      m23 = matrix.h,
      m31 = matrix.c,
      m32 = matrix.f,
      m33 = matrix.i,
      trace = matrix.trace()

    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1.0)

      out.w = 0.25 / s
      out.x = (m32 - m23) * s
      out.y = (m13 - m31) * s
      out.z = (m21 - m12) * s
    } else if (m11 > m22 && m11 > m33) {
      const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33)

      out.w = (m32 - m23) / s
      out.x = 0.25 * s
      out.y = (m12 + m21) / s
      out.z = (m13 + m31) / s
    } else if (m22 > m33) {
      const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33)

      out.w = (m13 - m31) / s
      out.x = (m12 + m21) / s
      out.y = 0.25 * s
      out.z = (m23 + m32) / s
    } else {
      const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22)

      out.w = (m21 - m12) / s
      out.x = (m13 + m31) / s
      out.y = (m23 + m32) / s
      out.z = 0.25 * s
    }

    return out
  }

  /**
   * Builds a quaternion from an axis and angle.
   */
  static fromAxisAngle(axis: Vector3, angle: number, out = new Quaternion()): Quaternion {
    const halfAngle = angle * 0.5
    const s = Math.sin(halfAngle)

    out.x = axis.x * s
    out.y = axis.y * s
    out.z = axis.z * s
    out.w = Math.cos(halfAngle)

    return out
  }

  /**
   * Rotates a vector by a quaternion in place.
   */
  static transformVector3(orientation: Quaternion, vector: Vector3): Vector3 {
    const vx = vector.x
    const vy = vector.y
    const vz = vector.z
    const qx = orientation.x
    const qy = orientation.y
    const qz = orientation.z
    const qw = orientation.w

    const tx = 2 * (qy * vz - qz * vy)
    const ty = 2 * (qz * vx - qx * vz)
    const tz = 2 * (qx * vy - qy * vx)

    vector.x = vx + qw * tx + qy * tz - qz * ty
    vector.y = vy + qw * ty + qz * tx - qx * tz
    vector.z = vz + qw * tz + qx * ty - qy * tx

    return vector
  }

  /**
   * Spherically interpolates between two quaternions.
   */
  static slerp(a: Quaternion, b: Quaternion, t: number, out = new Quaternion()): Quaternion | typeof Quaternion {
    if (t === 0) return out.copy(a)
    if (t === 1) return out.copy(b)

    const { x, y, z, w } = a

    let cosHalfTheta = w * b.w + x * b.x + y * b.y + z * b.z

    if (cosHalfTheta < 0) {
      out.w = -b.w
      out.x = -b.x
      out.y = -b.y
      out.z = -b.z

      cosHalfTheta = -cosHalfTheta
    } else {
      out.copy(b)
    }

    if (cosHalfTheta >= 1.0) {
      out.w = w
      out.x = x
      out.y = y
      out.z = z

      return out
    }

    const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta

    if (sqrSinHalfTheta <= Number.EPSILON) {
      const s = 1 - t

      out.w = s * w + t * out.w
      out.x = s * x + t * out.x
      out.y = s * y + t * out.y
      out.z = s * z + t * out.z
      out.normalize()

      return out
    }

    const sinHalfTheta = Math.sqrt(sqrSinHalfTheta)
    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta)
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta

    out.w = (w * ratioA + out.w * ratioB)
    out.x = (x * ratioA + out.x * ratioB)
    out.y = (y * ratioA + out.y * ratioB)
    out.z = (z * ratioA + out.z * ratioB)

    return this
  }

  /**
   * Checks component-wise equality for two quaternions.
   */
  static equal(a: Quaternion, b: Quaternion): boolean {
    return (a.x === b.x) && (a.y === b.y) && (a.z === b.z) && (a.w === b.w)
  }

  /**
   * Checks approximate equality for two quaternions.
   */
  static fuzzyEqual(a: Quaternion, b: Quaternion, tolerance?: number): boolean {
    return (
      fuzzyEqual(a.x, b.x, tolerance) &&
      fuzzyEqual(a.y, b.y, tolerance) &&
      fuzzyEqual(a.z, b.z, tolerance) &&
      fuzzyEqual(a.w, b.w, tolerance)
    )
  }

  /**
   * Creates a uniformly random unit quaternion.
   */
  static random(out = new Quaternion()): Quaternion {
    const theta1 = 2 * Math.PI * Math.random()
    const theta2 = 2 * Math.PI * Math.random()

    const x0 = Math.random()
    const r1 = Math.sqrt(1 - x0)
    const r2 = Math.sqrt(x0)

    return out.set(
      r1 * Math.sin(theta1),
      r1 * Math.cos(theta1),
      r2 * Math.sin(theta2),
      r2 * Math.cos(theta2)
    )
  }

  /**
   * Iterates over quaternion components in order.
   */
  * [Symbol.iterator](): IterableIterator<number> {
    yield this.x
    yield this.y
    yield this.z
    yield this.w
  }

  /**
   * The identity quaternion.
   */
  static readonly Identity = Quaternion.identity()

  /**
   * The zero quaternion.
   */
  static readonly Zero = Quaternion.zero()
}
