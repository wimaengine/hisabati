import { Vector3 } from '../vectors'
import { Quaternion } from '../angles'
import { Matrix3, Matrix4 } from '../matrices'
import { invert } from '../functions'

/**
 * Represents a 3x4 affine.
 * Can be used to represent 3 dimensional rotation, scale, skew and translation.
 *
 * Matrix layout:
 * | a | d | g | x |
 * | b | e | h | y |
 * | c | f | i | z |
 */
export class Affine3 {

  a!: number

  b!: number

  c!: number

  d!: number

  e!: number

  f!: number

  g!: number

  h!: number

  i!: number

  x!: number

  y!: number

  z!: number

  constructor(
    e11: number = 1,
    e12: number = 0,
    e13: number = 0,
    e14: number = 0,
    e21: number = 0,
    e22: number = 1,
    e23: number = 0,
    e24: number = 0,
    e31: number = 0,
    e32: number = 0,
    e33: number = 1,
    e34: number = 0
  ) {
    Affine3.set(e11, e12, e13, e14, e21, e22, e23, e24, e31, e32, e33, e34, this)
  }

  /**
   * Sets this affine from raw matrix components.
   */
  set(
    e11: number,
    e12: number,
    e13: number,
    e14: number,
    e21: number,
    e22: number,
    e23: number,
    e24: number,
    e31: number,
    e32: number,
    e33: number,
    e34: number
  ): this {
    Affine3.set(e11, e12, e13, e14, e21, e22, e23, e24, e31, e32, e33, e34, this)

    return this
  }

  /**
   * Copies another affine into this one.
   */
  copy(affine: Affine3): this {
    Affine3.copy(affine, this)

    return this
  }

  /**
   * Creates a new affine with the same components.
   */
  clone(): Affine3 {
    return new Affine3().copy(this)
  }

  /**
   * Composes this affine from translation, orientation and scale.
   */
  compose(translation: Vector3, orientation: Quaternion, scale: Vector3): this {
    Affine3.compose(translation, orientation, scale, this)

    return this
  }

  /**
   * Decomposes this affine into translation, orientation and scale.
   */
  decompose(): [Vector3, Quaternion, Vector3] {
    return Affine3.decompose(this)
  }

  /**
   * Applies a translation to this affine.
   */
  translate(translation: Vector3): this {
    Affine3.translate(this, translation, this)

    return this
  }

  /**
   * Applies a rotation to this affine.
   */
  rotate(angle: Quaternion): this {
    Affine3.rotate(this, angle, this)

    return this
  }

  /**
   * Applies a scale to this affine.
   */
  scale(scale: Vector3): this {
    Affine3.scale(this, scale, this)

    return this
  }

  /**
   * Orients this affine to face a target position.
   */
  lookAt(target: Vector3, up: Vector3): this {
    const eye = new Vector3(this.x, this.y, this.z)

    Affine3.lookAt(eye, target, up, this)

    return this
  }

  /**
   * Transforms a vector by this affine in place.
   */
  transform(vector: Vector3): Vector3 {
    return Affine3.transform(this, vector, vector)
  }

  /**
   * Inverts this affine in place.
   */
  invert(): this {
    Affine3.invert(this, this)

    return this
  }

  /**
   * Multiplies this affine by another (this = this * affine).
   */
  multiply(affine: Affine3): this {
    Affine3.multiply(this, affine, this)

    return this
  }

  /**
   * Divides this affine by another (this = this * inverse(affine)).
   */
  divide(affine: Affine3): this {
    Affine3.divide(this, affine, this)

    return this
  }

  /**
   * Checks component-wise equality.
   */
  equals(affine: Affine3): boolean {
    return Affine3.equal(this, affine)
  }

  /**
   * Creates or overwrites an affine with raw matrix components.
   */
  static set(
    e11: number,
    e12: number,
    e13: number,
    e14: number,
    e21: number,
    e22: number,
    e23: number,
    e24: number,
    e31: number,
    e32: number,
    e33: number,
    e34: number,
    out = new Affine3()
  ): Affine3 {
    out.a = e11
    out.b = e21
    out.c = e31
    out.d = e12
    out.e = e22
    out.f = e32
    out.g = e13
    out.h = e23
    out.i = e33
    out.x = e14
    out.y = e24
    out.z = e34

    return out
  }

  /**
   * Copies an affine into an output affine.
   */
  static copy(affine: Affine3, out = new Affine3()): Affine3 {
    out.a = affine.a
    out.b = affine.b
    out.c = affine.c
    out.d = affine.d
    out.e = affine.e
    out.f = affine.f
    out.g = affine.g
    out.h = affine.h
    out.i = affine.i
    out.x = affine.x
    out.y = affine.y
    out.z = affine.z

    return out
  }

  /**
   * Writes the identity transform.
   */
  static identity(out = new Affine3()): Affine3 {
    out.a = 1
    out.b = 0
    out.c = 0
    out.d = 0
    out.e = 1
    out.f = 0
    out.g = 0
    out.h = 0
    out.i = 1
    out.x = 0
    out.y = 0
    out.z = 0

    return out
  }

  /**
   * Writes the zero transform.
   */
  static zero(out = new Affine3()): Affine3 {
    out.a = 0
    out.b = 0
    out.c = 0
    out.d = 0
    out.e = 0
    out.f = 0
    out.g = 0
    out.h = 0
    out.i = 0
    out.x = 0
    out.y = 0
    out.z = 0

    return out
  }

  /**
   * Composes an affine from translation, orientation and scale.
   */
  static compose(position: Vector3, orientation: Quaternion, scale: Vector3, out = new Affine3()): Affine3 {
    const { x, y, z, w } = orientation
    const x2 = x + x
    const y2 = y + y
    const z2 = z + z
    const xx = x * x2
    const xy = x * y2
    const xz = x * z2
    const yy = y * y2
    const yz = y * z2
    const zz = z * z2
    const wx = w * x2
    const wy = w * y2
    const wz = w * z2

    const sx = scale.x
    const sy = scale.y
    const sz = scale.z

    out.a = (1 - (yy + zz)) * sx
    out.b = (xy + wz) * sx
    out.c = (xz - wy) * sx

    out.d = (xy - wz) * sy
    out.e = (1 - (xx + zz)) * sy
    out.f = (yz + wx) * sy

    out.g = (xz + wy) * sz
    out.h = (yz - wx) * sz
    out.i = (1 - (xx + yy)) * sz

    out.x = position.x
    out.y = position.y
    out.z = position.z

    return out
  }

  /**
   * Decomposes an affine into translation, orientation and scale.
   */
  static decompose(affine: Affine3): [Vector3, Quaternion, Vector3] {
    const position = new Vector3()
    const orientation = new Quaternion()
    const scale = new Vector3()
    const rotMatrix = new Matrix3(
      affine.a,
      affine.d,
      affine.g,
      affine.b,
      affine.e,
      affine.h,
      affine.c,
      affine.f,
      affine.i
    )

    const det = Matrix3.determinant(rotMatrix)
    const sx = new Vector3().set(affine.a, affine.b, affine.c)
      .magnitude() * (det < 0 ? -1 : 1)
    const sy = new Vector3().set(affine.d, affine.e, affine.f)
      .magnitude()
    const sz = new Vector3().set(affine.g, affine.h, affine.i)
      .magnitude()
    const invSX = 1 / sx
    const invSY = 1 / sy
    const invSZ = 1 / sz

    rotMatrix.a *= invSX
    rotMatrix.b *= invSX
    rotMatrix.c *= invSX
    rotMatrix.d *= invSY
    rotMatrix.e *= invSY
    rotMatrix.f *= invSY
    rotMatrix.g *= invSZ
    rotMatrix.h *= invSZ
    rotMatrix.i *= invSZ

    position.x = affine.x
    position.y = affine.y
    position.z = affine.z

    scale.x = sx
    scale.y = sy
    scale.z = sz

    Quaternion.fromRotationMatrix(rotMatrix, orientation)

    return [position, orientation, scale]
  }

  /**
   * Multiplies two affines (out = affine1 * affine2).
   */
  static multiply(affine1: Affine3, affine2: Affine3, out = new Affine3()): Affine3 {
    const
      a11 = affine1.a,
      a21 = affine1.b,
      a31 = affine1.c,
      a12 = affine1.d,
      a22 = affine1.e,
      a32 = affine1.f,
      a13 = affine1.g,
      a23 = affine1.h,
      a33 = affine1.i,
      a14 = affine1.x,
      a24 = affine1.y,
      a34 = affine1.z

    const
      b11 = affine2.a,
      b21 = affine2.b,
      b31 = affine2.c,
      b12 = affine2.d,
      b22 = affine2.e,
      b32 = affine2.f,
      b13 = affine2.g,
      b23 = affine2.h,
      b33 = affine2.i,
      b14 = affine2.x,
      b24 = affine2.y,
      b34 = affine2.z

    out.a = a11 * b11 + a12 * b21 + a13 * b31
    out.b = a21 * b11 + a22 * b21 + a23 * b31
    out.c = a31 * b11 + a32 * b21 + a33 * b31

    out.d = a11 * b12 + a12 * b22 + a13 * b32
    out.e = a21 * b12 + a22 * b22 + a23 * b32
    out.f = a31 * b12 + a32 * b22 + a33 * b32

    out.g = a11 * b13 + a12 * b23 + a13 * b33
    out.h = a21 * b13 + a22 * b23 + a23 * b33
    out.i = a31 * b13 + a32 * b23 + a33 * b33

    out.x = a11 * b14 + a12 * b24 + a13 * b34 + a14
    out.y = a21 * b14 + a22 * b24 + a23 * b34 + a24
    out.z = a31 * b14 + a32 * b24 + a33 * b34 + a34

    return out
  }

  /**
   * Divides two affines (out = affine1 * inverse(affine2)).
   */
  static divide(affine1: Affine3, affine2: Affine3, out = new Affine3()): Affine3 {
    const multiplier = this.invert(affine2)

    this.multiply(affine1, multiplier, out)

    return out
  }

  /**
   * Inverts an affine.
   */
  static invert(affine: Affine3, out = new Affine3()): Affine3 {
    const { a, b, c, d, e, f, g, h, i, x, y, z } = affine
    const t11 = i * e - h * f
    const t12 = h * c - i * b
    const t13 = f * b - e * c

    const det = a * t11 + d * t12 + g * t13

    if (det === 0) return this.zero(out)

    const detInv = invert(det)

    out.a = t11 * detInv
    out.b = t12 * detInv
    out.c = t13 * detInv
    out.d = (g * f - i * d) * detInv
    out.e = (i * a - g * c) * detInv
    out.f = (d * c - f * a) * detInv
    out.g = (h * d - g * e) * detInv
    out.h = (g * b - h * a) * detInv
    out.i = (e * a - d * b) * detInv

    out.x = -(out.a * x + out.d * y + out.g * z)
    out.y = -(out.b * x + out.e * y + out.h * z)
    out.z = -(out.c * x + out.f * y + out.i * z)

    return out
  }

  /**
   * Translates an affine.
   */
  static translate(affine: Affine3, translation: Vector3, out = new Affine3()): Affine3 {
    out.a = affine.a
    out.b = affine.b
    out.c = affine.c
    out.d = affine.d
    out.e = affine.e
    out.f = affine.f
    out.g = affine.g
    out.h = affine.h
    out.i = affine.i
    out.x = affine.x + translation.x
    out.y = affine.y + translation.y
    out.z = affine.z + translation.z

    return out
  }

  /**
   * Rotates an affine by a quaternion.
   */
  static rotate(affine: Affine3, rotation: Quaternion, out = new Affine3()): Affine3 {
    const { x, y, z } = affine
    const { x: qx, y: qy, z: qz, w: qw } = rotation
    const q00 = qw * qw
    const q01 = qw * qx
    const q02 = qw * qy
    const q03 = qw * qz
    const q11 = qx * qx
    const q12 = qx * qy
    const q13 = qx * qz
    const q22 = qy * qy
    const q23 = qy * qz
    const q33 = qz * qz
    const tx = 2 * (qy * z - qz * y)
    const ty = 2 * (qz * x - qx * z)
    const tz = 2 * (qx * y - qy * x)
    const matrixA = new Matrix3(
      affine.a,
      affine.d,
      affine.f,
      affine.b,
      affine.e,
      affine.h,
      affine.c,
      affine.f,
      affine.i
    )

    const matrixB = new Matrix3(
      2 * (q00 + q11) - 1,
      2 * (q12 - q03),
      2 * (q13 + q02),
      2 * (q12 + q03),
      2 * (q00 + q22) - 1,
      2 * (q23 + q01),
      2 * (q13 + q02),
      2 * (q12 + q03),
      2 * (q00 + q33) - 1
    )

    Matrix3.multiply(matrixA, matrixB, matrixA)

    out.a = matrixA.a
    out.b = matrixA.b
    out.c = matrixA.c
    out.d = matrixA.d
    out.e = matrixA.e
    out.f = matrixA.f
    out.g = matrixA.g
    out.h = matrixA.h
    out.i = matrixA.i
    out.x = x + qw * tx + qy * tz - qz * ty
    out.y = y + qw * ty + qz * tx - qx * tz
    out.z = z + qw * tz + qx * ty - qy * tx

    return out
  }

  /**
   * Scales an affine by per-axis factors.
   */
  static scale(affine: Affine3, scale: Vector3, out = new Affine3()): Affine3 {
    out.a = affine.a * scale.x
    out.b = affine.b * scale.x
    out.c = affine.c * scale.x
    out.d = affine.d * scale.y
    out.e = affine.e * scale.y
    out.f = affine.f * scale.y
    out.g = affine.g * scale.z
    out.h = affine.h * scale.z
    out.i = affine.i * scale.z

    return out
  }

  /**
   * Creates a look-at transform from eye to target with an up direction.
   */
  static lookAt(eye: Vector3, target: Vector3, up: Vector3, out = new Affine3()): Affine3 {
    const eyex = eye.x
    const eyey = eye.y
    const eyez = eye.z
    const upx = up.x
    const upy = up.y
    const upz = up.z

    let zx = eyex - target.x
    let zy = eyey - target.y
    let zz = eyez - target.z

    let len = zx * zx + zy * zy + zz * zz

    if (len > 0) {
      len = invert(Math.sqrt(len))
      zx *= len
      zy *= len
      zz *= len
    } else {
      zz = 1
    }

    let xx = upy * zz - upz * zy
    let xy = upz * zx - upx * zz
    let xz = upx * zy - upy * zx

    len = xx * xx + xy * xy + xz * xz

    if (len > 0) {
      len = invert(Math.sqrt(len))
      xx *= len
      xy *= len
      xz *= len
    } else {
      if (Math.abs(upz) === 1) {
        zx += 0.0001
      } else {
        zz += 0.0001
      }

      len = zx * zx + zy * zy + zz * zz
      len = invert(Math.sqrt(len))
      zx *= len
      zy *= len
      zz *= len
      xx = upy * zz - upz * zy
      xy = upz * zx - upx * zz
      xz = upx * zy - upy * zx
    }

    out.a = xx
    out.b = xy
    out.c = xz
    out.d = zy * xz - zz * xy
    out.e = zz * xx - zx * xz
    out.f = zx * xy - zy * xx
    out.g = zx
    out.h = zy
    out.i = zz
    out.x = eyex
    out.y = eyey
    out.z = eyez

    return out
  }

  /**
   * Transforms a vector by an affine.
   */
  static transform(affine: Affine3, vector: Vector3, out = new Vector3()): Vector3 {
    const { a, b, c, d, e, f, g, h, i, x, y, z } = affine
    const { x: vx, y: vy, z: vz } = vector

    out.x = a * vx + d * vy + g * vz + x
    out.y = b * vx + e * vy + h * vz + y
    out.z = c * vx + f * vy + i * vz + z

    return out
  }

  /**
   * Converts this affine to a 4x4 matrix.
   */
  static toMatrix4(affine: Affine3, out = new Matrix4()): Matrix4 {
    return Matrix4.set(
      affine.a,
      affine.d,
      affine.g,
      affine.x,
      affine.b,
      affine.e,
      affine.h,
      affine.y,
      affine.c,
      affine.f,
      affine.i,
      affine.z,
      0,
      0,
      0,
      1,
      out
    )
  }

  /**
   * Checks component-wise equality for two affines.
   */
  static equal(affine1: Affine3, Affine3: Affine3): boolean {
    return (
      (affine1.a === Affine3.a) &&
      (affine1.b === Affine3.b) &&
      (affine1.c === Affine3.c) &&
      (affine1.d === Affine3.d) &&
      (affine1.e === Affine3.e) &&
      (affine1.f === Affine3.f) &&
      (affine1.g === Affine3.g) &&
      (affine1.h === Affine3.h) &&
      (affine1.i === Affine3.i) &&
      (affine1.x === Affine3.x) &&
      (affine1.y === Affine3.y) &&
      (affine1.z === Affine3.z)
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
    yield this.e
    yield this.f
    yield this.g
    yield this.h
    yield this.i
    yield this.x
    yield this.y
    yield this.z
  }

  /**
   * The identity affine.
   */
  static readonly Identity = Affine3.identity()

  /**
   * The zero affine.
   */
  static readonly Zero = Affine3.zero()
}
