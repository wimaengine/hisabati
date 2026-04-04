import { invert } from '../functions'
import { Vector3 } from '../vectors'

/**
 * Represents a 3x3 square matrix.
 * Can be used to represent 3 dimensional rotation, scale and skew.
 *
 * Column major layout:
 * | a | d | g |
 * | b | e | h |
 * | c | f | i |
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

  /**
   * Creates a matrix from raw components.
   */
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

  /**
   * Sets this matrix from raw components.
   */
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

  /**
   * Copies another matrix into this one.
   */
  copy(other: Matrix3): this {
    Matrix3.copy(other, this)

    return this
  }

  /**
   * Creates a new matrix with the same components.
   */
  clone(): Matrix3 {
    return Matrix3.copy(this)
  }

  /**
   * Transposes this matrix in place.
   */
  transpose(): Matrix3 {
    return Matrix3.transpose(this)
  }

  /**
   * Returns the determinant of this matrix.
   */
  determinant(): number {
    return Matrix3.determinant(this)
  }

  /**
   * Returns the trace of this matrix.
   */
  trace(): number {
    return Matrix3.trace(this)
  }

  /**
   * Adds another matrix to this one.
   */
  add(matrix: Matrix3): Matrix3 {
    return Matrix3.add(this, matrix)
  }

  /**
   * Adds a scalar to each element.
   */
  addScalar(scalar: number): Matrix3 {
    return Matrix3.addScalar(this, scalar)
  }

  /**
   * Subtracts another matrix from this one.
   */
  subtract(matrix: Matrix3): Matrix3 {
    return Matrix3.subtract(this, matrix)
  }

  /**
   * Subtracts a scalar from each element.
   */
  subtractScalar(scalar: number): Matrix3 {
    return Matrix3.subtractScalar(this, scalar)
  }

  /**
   * Multiplies this matrix by another.
   */
  multiply(matrix: Matrix3): Matrix3 {
    return Matrix3.multiply(this, matrix)
  }

  /**
   * Multiplies each element by a scalar.
   */
  multiplyScalar(scalar: number): Matrix3 {
    return Matrix3.multiplyScalar(this, scalar)
  }

  /**
   * Divides this matrix by another (this = this * inverse(matrix)).
   */
  divide(matrix: Matrix3): Matrix3 {
    return Matrix3.divide(this, matrix)
  }

  /**
   * Divides each element by a scalar.
   */
  divideScalar(scalar: number): Matrix3 {
    return Matrix3.divideScalar(this, scalar)
  }

  /**
   * Inverts this matrix in place.
   */
  invert(): Matrix3 {
    return Matrix3.invert(this)
  }

  /**
   * Checks component-wise equality.
   */
  equals(matrix: Matrix3): boolean {
    return Matrix3.equal(this, matrix)
  }

  /**
   * Creates or overwrites a matrix from raw components.
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

  /**
   * Copies a matrix into an output matrix.
   */
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

  /**
   * Transposes a matrix.
   */
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

  /**
   * Writes the identity matrix.
   */
  static identity(out = new Matrix3()): Matrix3 {
    Matrix3.set(1, 0, 0, 0, 1, 0, 0, 0, 1, out)

    return out
  }

  /**
   * Writes the zero matrix.
   */
  static zero(out = new Matrix3()): Matrix3 {
    Matrix3.set(0, 0, 0, 0, 0, 0, 0, 0, 0, out)

    return out
  }

  /**
   * Computes the determinant of a matrix.
   */
  static determinant(matrix: Matrix3): number {
    return matrix.a * matrix.e * matrix.i - matrix.a * matrix.f * matrix.h - matrix.b * matrix.d * matrix.i + matrix.b * matrix.f * matrix.g + matrix.c * matrix.d * matrix.h - matrix.c * matrix.e * matrix.g
  }

  /**
   * Computes the trace of a matrix.
   */
  static trace(matrix: Matrix3): number {
    return matrix.a + matrix.e + matrix.i
  }

  /**
   * Adds two matrices.
   */
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

  /**
   * Adds a scalar to each element.
   */
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

  /**
   * Subtracts two matrices.
   */
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

  /**
   * Subtracts a scalar from each element.
   */
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

  /**
   * Multiplies two matrices.
   */
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

  /**
   * Multiplies a matrix by a scalar.
   */
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

  /**
   * Divides two matrices (out = matrix1 * inverse(matrix2)).
   */
  static divide(matrix1: Matrix3, matrix2: Matrix3, out = new Matrix3()): Matrix3 {
    const multiplier = this.invert(matrix2)

    this.multiply(matrix1, multiplier, out)

    return out
  }

  /**
   * Divides a matrix by a scalar.
   */
  static divideScalar(matrix: Matrix3, scalar: number, out = new Matrix3()): Matrix3 {
    this.multiplyScalar(matrix, invert(scalar), out)

    return out
  }

  /**
   * Inverts a matrix.
   */
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

  /**
   * Checks component-wise equality for two matrices.
   */
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

  /**
   * Builds a rotation matrix from Euler angles.
   */
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

  /**
   * Iterates over the matrix components in column-major order.
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
  }

  /**
   * The identity matrix.
   */
  static readonly Identity = Matrix3.identity()

  /**
   * The zero matrix.
   */
  static readonly Zero = Matrix3.zero()
}
