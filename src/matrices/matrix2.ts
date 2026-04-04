import { invert } from '../functions'

/**
 * Represents a 2x2 matrix.
 *
 * Matrix layout:
 * | a | c |
 * | b | d |
 */
export class Matrix2 {

  a!: number

  b!: number

  c!: number

  d!: number

  /**
   * Creates a matrix from raw components.
   */
  constructor(e11: number = 1, e12: number = 0, e21: number = 0, e22: number = 1) {
    this.a = e11
    this.b = e21
    this.c = e12
    this.d = e22
  }

  /**
   * Sets this matrix from raw components.
   */
  set(e11: number, e12: number, e21: number, e22: number): this {
    Matrix2.set(e11, e12, e21, e22, this)

    return this
  }

  /**
   * Copies another matrix into this one.
   */
  copy(other: Matrix2): this {
    Matrix2.copy(other, this)

    return this
  }

  /**
   * Creates a new matrix with the same components.
   */
  clone(): Matrix2 {
    return Matrix2.copy(this)
  }

  /**
   * Transposes this matrix in place.
   */
  transpose(): Matrix2 {
    return Matrix2.transpose(this)
  }

  /**
   * Returns the determinant of this matrix.
   */
  determinant(): number {
    return Matrix2.determinant(this)
  }

  /**
   * Returns the trace of this matrix.
   */
  trace(): number {
    return Matrix2.trace(this)
  }

  /**
   * Adds another matrix to this one.
   */
  add(matrix: Matrix2): Matrix2 {
    return Matrix2.add(this, matrix)
  }

  /**
   * Adds a scalar to each element.
   */
  addScalar(scalar: number): Matrix2 {
    return Matrix2.addScalar(this, scalar)
  }

  /**
   * Subtracts another matrix from this one.
   */
  subtract(matrix: Matrix2): Matrix2 {
    return Matrix2.subtract(this, matrix)
  }

  /**
   * Subtracts a scalar from each element.
   */
  subtractScalar(scalar: number): Matrix2 {
    return Matrix2.subtractScalar(this, scalar)
  }

  /**
   * Multiplies this matrix by another.
   */
  multiply(matrix: Matrix2): Matrix2 {
    return Matrix2.multiply(this, matrix)
  }

  /**
   * Multiplies each element by a scalar.
   */
  multiplyScalar(scalar: number): Matrix2 {
    return Matrix2.multiplyScalar(this, scalar)
  }

  /**
   * Divides this matrix by another (this = this * inverse(matrix)).
   */
  divide(matrix: Matrix2): Matrix2 {
    return Matrix2.divide(this, matrix)
  }

  /**
   * Divides each element by a scalar.
   */
  divideScalar(scalar: number): Matrix2 {
    return Matrix2.divideScalar(this, scalar)
  }

  /**
   * Inverts this matrix in place.
   */
  invert(): Matrix2 {
    return Matrix2.invert(this)
  }

  /**
   * Checks component-wise equality.
   */
  equals(matrix: Matrix2): boolean {
    return Matrix2.equal(this, matrix)
  }

  /**
   * Creates or overwrites a matrix from raw components.
   */
  static set(e11: number, e12: number, e21: number, e22: number, out = new Matrix2()): Matrix2 {
    out.a = e11
    out.b = e21
    out.c = e12
    out.d = e22

    return out
  }

  /**
   * Copies a matrix into an output matrix.
   */
  static copy(matrix: Matrix2, out = new Matrix2()): Matrix2 {
    out.a = matrix.a
    out.b = matrix.b
    out.c = matrix.c
    out.d = matrix.d

    return out
  }

  /**
   * Transposes a matrix.
   */
  static transpose(matrix: Matrix2, out = new Matrix2()): Matrix2 {
    const { b } = matrix

    out.a = matrix.a
    out.b = matrix.c
    out.c = b
    out.d = matrix.d

    return out
  }

  /**
   * Writes the identity matrix.
   */
  static identity(out = new Matrix2()): Matrix2 {
    this.set(1, 0, 0, 1, out)

    return out
  }

  /**
   * Writes the zero matrix.
   */
  static zero(out = new Matrix2()): Matrix2 {
    this.set(0, 0, 0, 0, out)

    return out
  }

  /**
   * Computes the determinant of a matrix.
   */
  static determinant(matrix: Matrix2): number {
    return matrix.a * matrix.d - matrix.c * matrix.b
  }

  /**
   * Computes the trace of a matrix.
   */
  static trace(matrix: Matrix2): number {
    return matrix.a + matrix.d
  }

  /**
   * Adds two matrices.
   */
  static add(matrix1: Matrix2, matrix2: Matrix2, out = new Matrix2()): Matrix2 {
    out.a = matrix1.a + matrix2.a
    out.b = matrix1.b + matrix2.b
    out.c = matrix1.c + matrix2.c
    out.d = matrix1.d + matrix2.d

    return out
  }

  /**
   * Adds a scalar to each element.
   */
  static addScalar(matrix: Matrix2, scalar: number, out = new Matrix2()): Matrix2 {
    out.a = matrix.a + scalar
    out.b = matrix.b + scalar
    out.c = matrix.c + scalar
    out.d = matrix.d + scalar

    return out
  }

  /**
   * Subtracts two matrices.
   */
  static subtract(matrix1: Matrix2, matrix2: Matrix2, out = new Matrix2()): Matrix2 {
    out.a = matrix1.a - matrix2.a
    out.b = matrix1.b - matrix2.b
    out.c = matrix1.c - matrix2.c
    out.d = matrix1.d - matrix2.d

    return out
  }

  /**
   * Subtracts a scalar from each element.
   */
  static subtractScalar(matrix: Matrix2, scalar: number, out = new Matrix2()): Matrix2 {
    out.a = matrix.a - scalar
    out.b = matrix.b - scalar
    out.c = matrix.c - scalar
    out.d = matrix.d - scalar

    return out
  }

  /**
   * Multiplies two matrices.
   */
  static multiply(matrix1: Matrix2, matrix2: Matrix2, out = new Matrix2()): Matrix2 {
    const { a: aa, b: ab, c: ac, d: ad } = matrix1
    const { a: ba, b: bb, c: bc, d: bd } = matrix2

    out.a = aa * ba + ac * bb
    out.b = ab * ba + ad * bb
    out.c = aa * bc + ac * bd
    out.d = ab * bc + ad * bd

    return out
  }

  /**
   * Multiplies a matrix by a scalar.
   */
  static multiplyScalar(matrix: Matrix2, scalar: number, out = new Matrix2()): Matrix2 {
    out.a = matrix.a * scalar
    out.b = matrix.b * scalar
    out.c = matrix.c * scalar
    out.d = matrix.d * scalar

    return out
  }

  /**
   * Divides two matrices (out = matrix1 * inverse(matrix2)).
   */
  static divide(matrix1: Matrix2, matrix2: Matrix2, out = new Matrix2()): Matrix2 {
    const multiplier = this.invert(matrix2)

    this.multiply(matrix1, multiplier, out)

    return out
  }

  /**
   * Divides a matrix by a scalar.
   */
  static divideScalar(matrix: Matrix2, scalar: number, out = new Matrix2()): Matrix2 {
    this.multiplyScalar(matrix, invert(scalar), out)

    return out
  }

  /**
   * Inverts a matrix.
   */
  static invert(matrix: Matrix2, out = new Matrix2()): Matrix2 {
    const { a, b, c, d } = matrix
    const det = this.determinant(matrix)

    if (det === 0) {
      return this.zero(out)
    }

    const detInv = invert(det)

    out.a = detInv * d
    out.b = detInv * -b
    out.c = detInv * -c
    out.d = detInv * a

    return out
  }

  /**
   * Checks component-wise equality for two matrices.
   */
  static equal(matrix1: Matrix2, matrix2: Matrix2): boolean {
    return (
      matrix1.a === matrix2.a ||
      matrix1.b === matrix2.b ||
      matrix1.c === matrix2.c ||
      matrix1.d === matrix2.d
    )
  }

  /**
   * Iterates over the matrix components in column-major order.
   */
  * [Symbol.iterator](): IterableIterator<number> {
    yield this.a
    yield this.b
    yield this.c
    yield this.d
  }

  /**
   * The identity matrix.
   */
  static readonly Identity = Matrix2.identity()

  /**
   * The zero matrix.
   */
  static readonly Zero = Matrix2.zero()
}
