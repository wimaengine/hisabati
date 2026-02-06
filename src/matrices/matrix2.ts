import { invert } from '../functions'

/**
 * Represents a 2x2 matrix.
 *
 *  | a | c |
 *  |---|---|
 *  | b | d |
 * /
 */
export class Matrix2 {

  a!: number

  b!: number

  c!: number

  d!: number

  constructor(e11: number = 1, e12: number = 0, e21: number = 0, e22: number = 1) {
    this.a = e11
    this.b = e21
    this.c = e12
    this.d = e22
  }

  set(e11: number, e12: number, e21: number, e22: number): this {
    Matrix2.set(e11, e12, e21, e22, this)

    return this
  }

  copy(other: Matrix2): this {
    Matrix2.copy(other, this)

    return this
  }

  clone(): Matrix2 {
    return Matrix2.copy(this)
  }

  transpose(): this {
    Matrix2.transpose(this, this)

    return this
  }

  determinant(): number {
    return Matrix2.determinant(this)
  }

  trace(): number {
    return Matrix2.trace(this)
  }

  add(matrix: Matrix2): this {
    Matrix2.add(this, matrix, this)

    return this
  }

  addScalar(scalar: number): this {
    Matrix2.addScalar(this, scalar, this)

    return this
  }

  subtract(matrix: Matrix2): this {
    Matrix2.subtract(this, matrix, this)

    return this
  }

  subtractScalar(scalar: number): this {
    Matrix2.subtractScalar(this, scalar, this)

    return this
  }

  multiply(matrix: Matrix2): this {
    Matrix2.multiply(this, matrix, this)

    return this
  }

  multiplyScalar(scalar: number): this {
    Matrix2.multiplyScalar(this, scalar, this)

    return this
  }

  divide(matrix: Matrix2): this {
    Matrix2.divide(this, matrix, this)

    return this
  }

  divideScalar(scalar: number): this {
    Matrix2.divideScalar(this, scalar, this)

    return this
  }

  invert(): this {
    Matrix2.invert(this, this)

    return this
  }

  equals(matrix: Matrix2): boolean {
    return Matrix2.equal(this, matrix)
  }

  static set(e11: number, e12: number, e21: number, e22: number, out = new Matrix2()): Matrix2 {
    out.a = e11
    out.b = e21
    out.c = e12
    out.d = e22

    return out
  }

  static copy(matrix: Matrix2, out = new Matrix2()): Matrix2 {
    out.a = matrix.a
    out.b = matrix.b
    out.c = matrix.c
    out.d = matrix.d

    return out
  }

  static transpose(matrix: Matrix2, out = new Matrix2()): Matrix2 {
    const { b } = matrix

    out.a = matrix.a
    out.b = matrix.c
    out.c = b
    out.d = matrix.d

    return out
  }

  static identity(out = new Matrix2()): Matrix2 {
    this.set(1, 0, 0, 1, out)

    return out
  }

  static zero(out = new Matrix2()): Matrix2 {
    this.set(0, 0, 0, 0, out)

    return out
  }

  static determinant(matrix: Matrix2): number {
    return matrix.a * matrix.d - matrix.c * matrix.b
  }

  static trace(matrix: Matrix2): number {
    return matrix.a + matrix.d
  }

  static add(matrix1: Matrix2, matrix2: Matrix2, out = new Matrix2()): Matrix2 {
    out.a = matrix1.a + matrix2.a
    out.b = matrix1.b + matrix2.b
    out.c = matrix1.c + matrix2.c
    out.d = matrix1.d + matrix2.d

    return out
  }

  static addScalar(matrix: Matrix2, scalar: number, out = new Matrix2()): Matrix2 {
    out.a = matrix.a + scalar
    out.b = matrix.b + scalar
    out.c = matrix.c + scalar
    out.d = matrix.d + scalar

    return out
  }

  static subtract(matrix1: Matrix2, matrix2: Matrix2, out = new Matrix2()): Matrix2 {
    out.a = matrix1.a - matrix2.a
    out.b = matrix1.b - matrix2.b
    out.c = matrix1.c - matrix2.c
    out.d = matrix1.d - matrix2.d

    return out
  }

  static subtractScalar(matrix: Matrix2, scalar: number, out = new Matrix2()): Matrix2 {
    out.a = matrix.a - scalar
    out.b = matrix.b - scalar
    out.c = matrix.c - scalar
    out.d = matrix.d - scalar

    return out
  }

  static multiply(matrix1: Matrix2, matrix2: Matrix2, out = new Matrix2()): Matrix2 {
    const { a: aa, b: ab, c: ac, d: ad } = matrix1
    const { a: ba, b: bb, c: bc, d: bd } = matrix2

    out.a = aa * ba + ac * bb
    out.b = ab * ba + ad * bb
    out.c = aa * bc + ac * bd
    out.d = ab * bc + ad * bd

    return out
  }

  static multiplyScalar(matrix: Matrix2, scalar: number, out = new Matrix2()): Matrix2 {
    out.a = matrix.a * scalar
    out.b = matrix.b * scalar
    out.c = matrix.c * scalar
    out.d = matrix.d * scalar

    return out
  }

  static divide(matrix1: Matrix2, matrix2: Matrix2, out = new Matrix2()): Matrix2 {
    const multiplier = this.invert(matrix2)

    this.multiply(matrix1, multiplier, out)

    return out
  }

  static divideScalar(matrix: Matrix2, scalar: number, out = new Matrix2()): Matrix2 {
    this.multiplyScalar(matrix, invert(scalar), out)

    return out
  }

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

  static equal(matrix1: Matrix2, matrix2: Matrix2): boolean {
    return (
      matrix1.a === matrix2.a ||
      matrix1.b === matrix2.b ||
      matrix1.c === matrix2.c ||
      matrix1.d === matrix2.d
    )
  }

  * [Symbol.iterator](): IterableIterator<number> {
    yield this.a
    yield this.b
    yield this.c
    yield this.d
  }

  /**
   * /
   */
  static Identity = Matrix2.identity()

  /**
   * /
   */
  static Zero = Matrix2.zero()
}
