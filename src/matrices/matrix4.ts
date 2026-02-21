import { invert } from '../functions'

/**
 * Represents a 4x4 square matrix.
 * Can be used to represent 3 dimensional rotation, scale and skew.
 *
 * Column major layout:
 * | a | e | i | m |
 * | b | f | j | n |
 * | c | g | k | o |
 * | d | h | l | p |
 */
export class Matrix4 {

  /**
   * Matrix element a (row 1, column 1).
   */
  a = 1

  /**
   * Matrix element b (row 2, column 1).
   */
  b = 0

  /**
   * Matrix element c (row 3, column 1).
   */
  c = 0

  /**
   * Matrix element d (row 4, column 1).
   */
  d = 0

  /**
   * Matrix element e (row 1, column 2).
   */
  e = 0

  /**
   * Matrix element f (row 2, column 2).
   */
  f = 1

  /**
   * Matrix element g (row 3, column 2).
   */
  g = 0

  /**
   * Matrix element h (row 4, column 2).
   */
  h = 0

  /**
   * Matrix element i (row 1, column 3).
   */
  i = 0

  /**
   * Matrix element j (row 2, column 3).
   */
  j = 0

  /**
   * Matrix element k (row 3, column 3).
   */
  k = 1

  /**
   * Matrix element l (row 4, column 3).
   */
  l = 0

  /**
   * Matrix element m (row 1, column 4).
   */
  m = 0

  /**
   * Matrix element n (row 2, column 4).
   */
  n = 0

  /**
   * Matrix element o (row 3, column 4).
   */
  o = 0

  /**
   * Matrix element p (row 4, column 4).
   */
  p = 1

  /**
   * Creates a matrix from raw components.
   */
  constructor(
    n11: number = 1,
    n12: number = 0,
    n13: number = 0,
    n14: number = 0,
    n21: number = 0,
    n22: number = 1,
    n23: number = 0,
    n24: number = 0,
    n31: number = 0,
    n32: number = 0,
    n33: number = 1,
    n34: number = 0,
    n41: number = 0,
    n42: number = 0,
    n43: number = 0,
    n44: number = 1
  ) {
    Matrix4.set(
      n11,
      n12,
      n13,
      n14,
      n21,
      n22,
      n23,
      n24,
      n31,
      n32,
      n33,
      n34,
      n41,
      n42,
      n43,
      n44,
      this
    )
  }

  /**
   * Sets this matrix from raw components.
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
    e34: number,
    e41: number,
    e42: number,
    e43: number,
    e44: number
  ): this {
    Matrix4.set(e11, e12, e13, e14, e21, e22, e23, e24, e31, e32, e33, e34, e41, e42, e43, e44, this)

    return this
  }

  /**
   * Copies another matrix into this one.
   */
  copy(other: Matrix4): this {
    Matrix4.copy(other, this)

    return this
  }

  /**
   * Creates a new matrix with the same components.
   */
  clone(): Matrix4 {
    return Matrix4.copy(this)
  }

  /**
   * Transposes this matrix in place.
   */
  transpose(): this {
    Matrix4.transpose(this, this)

    return this
  }

  /**
   * Returns the determinant of this matrix.
   */
  determinant(): number {
    return Matrix4.determinant(this)
  }

  /**
   * Returns the trace of this matrix.
   */
  trace(): number {
    return Matrix4.trace(this)
  }

  /**
   * Adds another matrix to this one.
   */
  add(matrix: Matrix4): this {
    Matrix4.add(this, matrix, this)

    return this
  }

  /**
   * Adds a scalar to each element.
   */
  addScalar(scalar: number): this {
    Matrix4.addScalar(this, scalar, this)

    return this
  }

  /**
   * Subtracts another matrix from this one.
   */
  subtract(matrix: Matrix4): this {
    Matrix4.subtract(this, matrix, this)

    return this
  }

  /**
   * Subtracts a scalar from each element.
   */
  subtractScalar(scalar: number): this {
    Matrix4.subtractScalar(this, scalar, this)

    return this
  }

  /**
   * Multiplies this matrix by another.
   */
  multiply(matrix: Matrix4): this {
    Matrix4.multiply(this, matrix, this)

    return this
  }

  /**
   * Multiplies each element by a scalar.
   */
  multiplyScalar(scalar: number): this {
    Matrix4.multiplyScalar(this, scalar, this)

    return this
  }

  /**
   * Divides this matrix by another (this = this * inverse(matrix)).
   */
  divide(matrix: Matrix4): this {
    Matrix4.divide(this, matrix, this)

    return this
  }

  /**
   * Divides each element by a scalar.
   */
  divideScalar(scalar: number): this {
    Matrix4.divideScalar(this, scalar, this)

    return this
  }

  /**
   * Inverts this matrix in place.
   */
  invert(): this {
    Matrix4.invert(this, this)

    return this
  }

  /**
   * Checks component-wise equality.
   */
  equals(matrix: Matrix4): boolean {
    return Matrix4.equal(this, matrix)
  }

  /**
   * Creates or overwrites a matrix from raw components.
   */
  static set(
    n11: number = 1,
    n12: number = 0,
    n13: number = 0,
    n14: number = 0,
    n21: number = 0,
    n22: number = 1,
    n23: number = 0,
    n24: number = 0,
    n31: number = 0,
    n32: number = 0,
    n33: number = 1,
    n34: number = 0,
    n41: number = 0,
    n42: number = 0,
    n43: number = 0,
    n44: number = 1,
    out = new Matrix4()
  ): Matrix4 {
    out.a = n11
    out.b = n21
    out.c = n31
    out.d = n41
    out.e = n12
    out.f = n22
    out.g = n32
    out.h = n42
    out.i = n13
    out.j = n23
    out.k = n33
    out.l = n43
    out.m = n14
    out.n = n24
    out.o = n34
    out.p = n44

    return out
  }

  /**
   * Copies a matrix into an output matrix.
   */
  static copy(matrix: Matrix4, out = new Matrix4()): Matrix4 {
    out.a = matrix.a
    out.b = matrix.b
    out.c = matrix.c
    out.d = matrix.d
    out.e = matrix.e
    out.f = matrix.f
    out.g = matrix.g
    out.h = matrix.h
    out.i = matrix.i
    out.j = matrix.j
    out.k = matrix.k
    out.l = matrix.l
    out.m = matrix.m
    out.n = matrix.n
    out.o = matrix.o
    out.p = matrix.p

    return out
  }

  /**
   * Transposes a matrix.
   */
  static transpose(matrix: Matrix4, out = new Matrix4()): Matrix4 {
    let tmp

    out.a = matrix.a
    out.f = matrix.f
    out.k = matrix.k
    out.p = matrix.p

    tmp = matrix.b
    out.b = matrix.e
    out.e = tmp

    tmp = matrix.c
    out.c = matrix.i
    out.i = tmp

    tmp = matrix.g
    out.g = matrix.j
    out.j = tmp

    tmp = matrix.d
    out.d = matrix.m
    out.m = tmp

    tmp = matrix.h
    out.h = matrix.n
    out.n = tmp

    tmp = matrix.l
    out.l = matrix.o
    out.o = tmp

    return out
  }

  /**
   * Writes the identity matrix.
   */
  static identity(out = new Matrix4()): Matrix4 {
    Matrix4.set(
      // eslint-disable function-call
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      out
    )

    return out
  }

  /**
   * Writes the zero matrix.
   */
  static zero(out = new Matrix4()): Matrix4 {
    Matrix4.set(
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      out
    )

    return out
  }

  /**
   * Computes the determinant of a matrix.
   */
  static determinant(matrix: Matrix4): number {
    const n11 = matrix.a
    const n12 = matrix.e
    const n13 = matrix.i
    const n14 = matrix.m
    const n21 = matrix.b
    const n22 = matrix.f
    const n23 = matrix.j
    const n24 = matrix.n
    const n31 = matrix.c
    const n32 = matrix.g
    const n33 = matrix.k
    const n34 = matrix.o
    const n41 = matrix.d
    const n42 = matrix.h
    const n43 = matrix.l
    const n44 = matrix.p

    return (
      n41 * (
        +n14 * n23 * n32 -
        n13 * n24 * n32 -
        n14 * n22 * n33 +
        n12 * n24 * n33 +
        n13 * n22 * n34 -
        n12 * n23 * n34
      ) +
      n42 * (
        +n11 * n23 * n34 -
        n11 * n24 * n33 +
        n14 * n21 * n33 -
        n13 * n21 * n34 +
        n13 * n24 * n31 -
        n14 * n23 * n31
      ) +
      n43 * (
        +n11 * n24 * n32 -
        n11 * n22 * n34 -
        n14 * n21 * n32 +
        n12 * n21 * n34 +
        n14 * n22 * n31 -
        n12 * n24 * n31
      ) +
      n44 * (
        -n13 * n22 * n31 -
        n11 * n23 * n32 +
        n11 * n22 * n33 +
        n13 * n21 * n32 -
        n12 * n21 * n33 +
        n12 * n23 * n31
      )
    )
  }

  /**
   * Computes the trace of a matrix.
   */
  static trace(matrix: Matrix4): number {
    return matrix.a + matrix.f + matrix.k + matrix.p
  }

  /**
   * Adds two matrices.
   */
  static add(matrix1: Matrix4, matrix2: Matrix4, out = new Matrix4()): Matrix4 {
    out.a = matrix1.a + matrix2.a
    out.b = matrix1.b + matrix2.b
    out.c = matrix1.c + matrix2.c
    out.d = matrix1.d + matrix2.d
    out.e = matrix1.e + matrix2.e
    out.f = matrix1.f + matrix2.f
    out.g = matrix1.g + matrix2.g
    out.h = matrix1.h + matrix2.h
    out.i = matrix1.i + matrix2.i
    out.j = matrix1.j + matrix2.j
    out.k = matrix1.k + matrix2.k
    out.l = matrix1.l + matrix2.l
    out.m = matrix1.m + matrix2.m
    out.n = matrix1.n + matrix2.n
    out.o = matrix1.o + matrix2.o
    out.p = matrix1.p + matrix2.p

    return out
  }

  /**
   * Adds a scalar to each element.
   */
  static addScalar(matrix: Matrix4, scalar: number, out = new Matrix4()): Matrix4 {
    out.a = matrix.a + scalar
    out.b = matrix.b + scalar
    out.c = matrix.c + scalar
    out.d = matrix.d + scalar
    out.e = matrix.e + scalar
    out.f = matrix.f + scalar
    out.g = matrix.g + scalar
    out.h = matrix.h + scalar
    out.i = matrix.i + scalar
    out.j = matrix.j + scalar
    out.k = matrix.k + scalar
    out.l = matrix.l + scalar
    out.m = matrix.m + scalar
    out.n = matrix.n + scalar
    out.o = matrix.o + scalar
    out.p = matrix.p + scalar

    return out
  }

  /**
   * Subtracts two matrices.
   */
  static subtract(matrix1: Matrix4, matrix2: Matrix4, out = new Matrix4()): Matrix4 {
    out.a = matrix1.a - matrix2.a
    out.b = matrix1.b - matrix2.b
    out.c = matrix1.c - matrix2.c
    out.d = matrix1.d - matrix2.d
    out.e = matrix1.e - matrix2.e
    out.f = matrix1.f - matrix2.f
    out.g = matrix1.g - matrix2.g
    out.h = matrix1.h - matrix2.h
    out.i = matrix1.i - matrix2.i
    out.j = matrix1.j - matrix2.j
    out.k = matrix1.k - matrix2.k
    out.l = matrix1.l - matrix2.l
    out.m = matrix1.m - matrix2.m
    out.n = matrix1.n - matrix2.n
    out.o = matrix1.o - matrix2.o
    out.p = matrix1.p - matrix2.p

    return out
  }

  /**
   * Subtracts a scalar from each element.
   */
  static subtractScalar(matrix: Matrix4, scalar: number, out = new Matrix4()): Matrix4 {
    out.a = matrix.a - scalar
    out.b = matrix.b - scalar
    out.c = matrix.c - scalar
    out.d = matrix.d - scalar
    out.e = matrix.e - scalar
    out.f = matrix.f - scalar
    out.g = matrix.g - scalar
    out.h = matrix.h - scalar
    out.i = matrix.i - scalar
    out.j = matrix.j - scalar
    out.k = matrix.k - scalar
    out.l = matrix.l - scalar
    out.m = matrix.m - scalar
    out.n = matrix.n - scalar
    out.o = matrix.o - scalar
    out.p = matrix.p - scalar

    return out
  }

  /**
   * Multiplies two matrices.
   */
  static multiply(matrix1: Matrix4, matrix2: Matrix4, out = new Matrix4()): Matrix4 {
    const
      a11 = matrix1.a,
      a12 = matrix1.e,
      a13 = matrix1.i,
      a14 = matrix1.m,
      a21 = matrix1.b,
      a22 = matrix1.f,
      a23 = matrix1.j,
      a24 = matrix1.n,
      a31 = matrix1.c,
      a32 = matrix1.g,
      a33 = matrix1.k,
      a34 = matrix1.o,
      a41 = matrix1.d,
      a42 = matrix1.h,
      a43 = matrix1.l,
      a44 = matrix1.p

    const
      b11 = matrix2.a,
      b12 = matrix2.e,
      b13 = matrix2.i,
      b14 = matrix2.m,
      b21 = matrix2.b,
      b22 = matrix2.f,
      b23 = matrix2.j,
      b24 = matrix2.n,
      b31 = matrix2.c,
      b32 = matrix2.g,
      b33 = matrix2.k,
      b34 = matrix2.o,
      b41 = matrix2.d,
      b42 = matrix2.h,
      b43 = matrix2.l,
      b44 = matrix2.p

    out.a = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41
    out.e = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42
    out.i = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43
    out.m = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44

    out.b = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41
    out.f = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42
    out.j = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43
    out.n = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44

    out.c = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41
    out.g = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42
    out.k = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43
    out.o = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44

    out.d = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41
    out.h = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42
    out.l = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43
    out.p = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44

    return out
  }

  /**
   * Multiplies a matrix by a scalar.
   */
  static multiplyScalar(matrix: Matrix4, scalar: number, out = new Matrix4()): Matrix4 {
    out.a = matrix.a * scalar
    out.b = matrix.b * scalar
    out.c = matrix.c * scalar
    out.d = matrix.d * scalar
    out.e = matrix.e * scalar
    out.f = matrix.f * scalar
    out.g = matrix.g * scalar
    out.h = matrix.h * scalar
    out.i = matrix.i * scalar
    out.j = matrix.j * scalar
    out.k = matrix.k * scalar
    out.l = matrix.l * scalar
    out.m = matrix.m * scalar
    out.n = matrix.n * scalar
    out.o = matrix.o * scalar
    out.p = matrix.p * scalar

    return out
  }

  /**
   * Divides two matrices (out = matrix1 * inverse(matrix2)).
   */
  static divide(matrix1: Matrix4, matrix2: Matrix4, out = new Matrix4()): Matrix4 {
    const multiplier = this.invert(matrix2)

    this.multiply(matrix1, multiplier, out)

    return out
  }

  /**
   * Divides a matrix by a scalar.
   */
  static divideScalar(matrix: Matrix4, scalar: number, out = new Matrix4()): Matrix4 {
    this.multiplyScalar(matrix, invert(scalar), out)

    return out
  }

  /**
   * Inverts a matrix.
   */
  static invert(matrix: Matrix4, out = new Matrix4()): Matrix4 {
    const n11 = matrix.a
    const n21 = matrix.b
    const n31 = matrix.c
    const n41 = matrix.d
    const n12 = matrix.e
    const n22 = matrix.f
    const n32 = matrix.g
    const n42 = matrix.h
    const n13 = matrix.i
    const n23 = matrix.j
    const n33 = matrix.k
    const n43 = matrix.l
    const n14 = matrix.m
    const n24 = matrix.n
    const n34 = matrix.o
    const n44 = matrix.p

    const t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44
    const t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44
    const t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44
    const t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34

    const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14

    if (det === 0) return Matrix4.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, out)

    const detInv = 1 / det

    out.a = t11 * detInv
    out.b = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv
    out.c = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv
    out.d = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv

    out.e = t12 * detInv
    out.f = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv
    out.g = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv
    out.h = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv

    out.i = t13 * detInv
    out.j = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv
    out.k = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv
    out.l = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv

    out.m = t14 * detInv
    out.n = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv
    out.o = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv
    out.p = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv

    return out
  }

  /**
   * Checks component-wise equality for two matrices.
   */
  static equal(matrix1: Matrix4, matrix2: Matrix4): boolean {
    return (
      matrix1.a === matrix2.a &&
      matrix1.b === matrix2.b &&
      matrix1.c === matrix2.c &&
      matrix1.d === matrix2.d &&
      matrix1.e === matrix2.e &&
      matrix1.f === matrix2.f &&
      matrix1.g === matrix2.g &&
      matrix1.h === matrix2.h &&
      matrix1.i === matrix2.i &&
      matrix1.j === matrix2.j &&
      matrix1.k === matrix2.k &&
      matrix1.l === matrix2.l &&
      matrix1.m === matrix2.m &&
      matrix1.n === matrix2.n &&
      matrix1.o === matrix2.o &&
      matrix1.p === matrix2.p
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
    yield this.e
    yield this.f
    yield this.g
    yield this.h
    yield this.i
    yield this.j
    yield this.k
    yield this.l
    yield this.m
    yield this.n
    yield this.o
    yield this.p
  }

  /**
   * The identity matrix.
   */
  static readonly Identity = Matrix4.identity()

  /**
   * The zero matrix.
   */
  static readonly Zero = Matrix4.zero()
}
