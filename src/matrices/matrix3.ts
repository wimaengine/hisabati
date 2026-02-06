import { invert } from '../functions'
import { Vector3 } from '../vectors'

/**
 * Represents a 3x3 square matrix.
 * Can br used to represent 3 dimensional rotation, scale and skew.
 *
 * Column major.
 *
 *  | a | d | g |
 *  |---|---|---|
 *  | b | e | h |
 *  | c | f | i |
 * /
 */
export class Matrix3 {

  a!: number

  b!: number

  c!: number

  d!: number

  e!: number

  f!: number

  g!: number

  h!: number

  i!: number

  constructor(
    e11: number = 1,
    e12: number = 0,
    e13: number = 0,
    e21: number = 0,
    e22: number = 1,
    e23: number = 0,
    e31: number = 0,
    e32: number = 0,
    e33: number = 1
  ) {
    this.a = e11
    this.b = e21
    this.c = e31
    this.d = e12
    this.e = e22
    this.f = e32
    this.g = e13
    this.h = e23
    this.i = e33
  }

  set(
    e11: number,
    e12: number,
    e13: number,
    e21: number,
    e22: number,
    e23: number,
    e31: number,
    e32: number,
    e33: number
  ): this {
    Matrix3.set(e11, e12, e13, e21, e22, e23, e31, e32, e33, this)

    return this
  }

  copy(other: Matrix3): this {
    Matrix3.copy(other, this)

    return this
  }

  clone(): Matrix3 {
    return Matrix3.copy(this)
  }

  transpose(): this {
    Matrix3.transpose(this, this)

    return this
  }

  determinant(): number {
    return Matrix3.determinant(this)
  }

  trace(): number {
    return Matrix3.trace(this)
  }

  add(matrix: Matrix3): this {
    Matrix3.add(this, matrix, this)

    return this
  }

  addScalar(scalar: number): this {
    Matrix3.addScalar(this, scalar, this)

    return this
  }

  subtract(matrix: Matrix3): this {
    Matrix3.subtract(this, matrix, this)

    return this
  }

  subtractScalar(scalar: number): this {
    Matrix3.subtractScalar(this, scalar, this)

    return this
  }

  multiply(matrix: Matrix3): this {
    Matrix3.multiply(this, matrix, this)

    return this
  }

  multiplyScalar(scalar: number): this {
    Matrix3.multiplyScalar(this, scalar, this)

    return this
  }

  divide(matrix: Matrix3): this {
    Matrix3.divide(this, matrix, this)

    return this
  }

  divideScalar(scalar: number): this {
    Matrix3.divideScalar(this, scalar, this)

    return this
  }

  invert(): this {
    Matrix3.invert(this, this)

    return this
  }

  equals(matrix: Matrix3): boolean {
    return Matrix3.equal(this, matrix)
  }

  /**
   * /
   */
  static set(
    e11: number,
    e12: number,
    e13: number,
    e21: number,
    e22: number,
    e23: number,
    e31: number,
    e32: number,
    e33: number,
    out = new Matrix3()
  ): Matrix3 {
    out.a = e11
    out.b = e21
    out.c = e31
    out.d = e12
    out.e = e22
    out.f = e32
    out.g = e13
    out.h = e23
    out.i = e33

    return out
  }

  static copy(matrix: Matrix3, out = new Matrix3()): Matrix3 {
    out.a = matrix.a
    out.b = matrix.b
    out.c = matrix.c
    out.d = matrix.d
    out.e = matrix.e
    out.f = matrix.f
    out.g = matrix.g
    out.h = matrix.h
    out.i = matrix.i

    return out
  }

  static transpose(matrix: Matrix3, out = new Matrix3()): Matrix3 {
    const { a, b, c, d, e, f, g, h, i } = matrix

    out.a = a
    out.b = d
    out.c = g
    out.d = b
    out.e = e
    out.f = h
    out.g = c
    out.h = f
    out.i = i

    return out
  }

  static identity(out = new Matrix3()): Matrix3 {
    Matrix3.set(1, 0, 0, 0, 1, 0, 0, 0, 1, out)

    return out
  }

  static zero(out = new Matrix3()): Matrix3 {
    Matrix3.set(0, 0, 0, 0, 0, 0, 0, 0, 0, out)

    return out
  }

  static determinant(matrix: Matrix3): number {
    return matrix.a * matrix.e * matrix.i - matrix.a * matrix.f * matrix.h - matrix.b * matrix.d * matrix.i + matrix.b * matrix.f * matrix.g + matrix.c * matrix.d * matrix.h - matrix.c * matrix.e * matrix.g
  }

  static trace(matrix: Matrix3): number {
    return matrix.a + matrix.e + matrix.i
  }

  static add(matrix1: Matrix3, matrix2: Matrix3, out = new Matrix3()): Matrix3 {
    out.a = matrix1.a + matrix2.a
    out.b = matrix1.b + matrix2.b
    out.c = matrix1.c + matrix2.c
    out.d = matrix1.d + matrix2.d
    out.e = matrix1.e + matrix2.e
    out.f = matrix1.f + matrix2.f
    out.g = matrix1.g + matrix2.g
    out.h = matrix1.h + matrix2.h
    out.i = matrix1.i + matrix2.i

    return out
  }

  static addScalar(matrix: Matrix3, scalar: number, out = new Matrix3()): Matrix3 {
    out.a = matrix.a + scalar
    out.b = matrix.b + scalar
    out.c = matrix.c + scalar
    out.d = matrix.d + scalar
    out.e = matrix.e + scalar
    out.f = matrix.f + scalar
    out.g = matrix.g + scalar
    out.h = matrix.h + scalar
    out.i = matrix.i + scalar

    return out
  }

  static subtract(matrix1: Matrix3, matrix2: Matrix3, out = new Matrix3()): Matrix3 {
    out.a = matrix1.a - matrix2.a
    out.b = matrix1.b - matrix2.b
    out.c = matrix1.c - matrix2.c
    out.d = matrix1.d - matrix2.d
    out.e = matrix1.e - matrix2.e
    out.f = matrix1.f - matrix2.f
    out.g = matrix1.g - matrix2.g
    out.h = matrix1.h - matrix2.h
    out.i = matrix1.i - matrix2.i

    return out
  }

  static subtractScalar(matrix: Matrix3, scalar: number, out = new Matrix3()): Matrix3 {
    out.a = matrix.a - scalar
    out.b = matrix.b - scalar
    out.c = matrix.c - scalar
    out.d = matrix.d - scalar
    out.e = matrix.e - scalar
    out.f = matrix.f - scalar
    out.g = matrix.g - scalar
    out.h = matrix.h - scalar
    out.i = matrix.i - scalar

    return out
  }

  static multiply(matrix1: Matrix3, matrix2: Matrix3, out = new Matrix3()): Matrix3 {
    const a11 = matrix1.a
    const a12 = matrix1.d
    const a13 = matrix1.g
    const a21 = matrix1.b
    const a22 = matrix1.e
    const a23 = matrix1.h
    const a31 = matrix1.c
    const a32 = matrix1.f
    const a33 = matrix1.i

    const b11 = matrix2.a
    const b12 = matrix2.d
    const b13 = matrix2.g
    const b21 = matrix2.b
    const b22 = matrix2.e
    const b23 = matrix2.h
    const b31 = matrix2.c
    const b32 = matrix2.f
    const b33 = matrix2.i

    out.a = a11 * b11 + a12 * b21 + a13 * b31
    out.d = a11 * b12 + a12 * b22 + a13 * b32
    out.g = a11 * b13 + a12 * b23 + a13 * b33

    out.b = a21 * b11 + a22 * b21 + a23 * b31
    out.e = a21 * b12 + a22 * b22 + a23 * b32
    out.h = a21 * b13 + a22 * b23 + a23 * b33

    out.c = a31 * b11 + a32 * b21 + a33 * b31
    out.f = a31 * b12 + a32 * b22 + a33 * b32
    out.i = a31 * b13 + a32 * b23 + a33 * b33

    return out
  }

  static multiplyScalar(matrix: Matrix3, scalar: number, out = new Matrix3()): Matrix3 {
    out.a = matrix.a * scalar
    out.b = matrix.b * scalar
    out.c = matrix.c * scalar
    out.d = matrix.d * scalar
    out.e = matrix.e * scalar
    out.f = matrix.f * scalar
    out.g = matrix.g * scalar
    out.h = matrix.h * scalar
    out.i = matrix.i * scalar

    return out
  }

  static divide(matrix1: Matrix3, matrix2: Matrix3, out = new Matrix3()): Matrix3 {
    const multiplier = this.invert(matrix2)

    this.multiply(matrix1, multiplier, out)

    return out
  }

  static divideScalar(matrix: Matrix3, scalar: number, out = new Matrix3()): Matrix3 {
    this.multiplyScalar(matrix, invert(scalar), out)

    return out
  }

  static invert(matrix: Matrix3, out = new Matrix3()): Matrix3 {
    const
      { a, b, c, d, e, f, g, h, i } = matrix

    const t11 = i * e - h * f
    const t12 = h * c - i * b
    const t13 = f * b - e * c

    const det = a * t11 + d * t12 + g * t13

    if (det === 0) return Matrix3.zero(out)

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

    return out
  }

  static equal(matrix1: Matrix3, matrix2: Matrix3): boolean {
    return (
      matrix1.a === matrix2.a &&
      matrix1.b === matrix2.b &&
      matrix1.c === matrix2.c &&
      matrix1.d === matrix2.d &&
      matrix1.e === matrix2.e &&
      matrix1.f === matrix2.f &&
      matrix1.g === matrix2.g &&
      matrix1.h === matrix2.h &&
      matrix1.i === matrix2.i
    )
  }

  static fromEuler(euler: Vector3, out = new Matrix3()): Matrix3 {
    const { x } = euler
    const { y } = euler
    const { z } = euler
    const a = Math.cos(x)
    const b = Math.sin(x)
    const c = Math.cos(y)
    const d = Math.sin(y)
    const e = Math.cos(z)
    const f = Math.sin(z)
    const ae = a * e
    const af = a * f
    const be = b * e
    const bf = b * f

    out.a = c * e
    out.d = -c * f
    out.g = d

    out.b = af + be * d
    out.e = ae - bf * d
    out.h = -b * c

    out.c = bf - ae * d
    out.f = be + af * d
    out.i = a * c

    return out
  }

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
  }

  /**
   * /
   */
  static Identity = Matrix3.identity()

  /**
   * /
   */
  static Zero = Matrix3.zero()
}
