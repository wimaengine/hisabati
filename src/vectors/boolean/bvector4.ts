export class BVector4 {

  x: boolean

  y: boolean

  z: boolean

  w: boolean

  constructor(x: boolean = false, y: boolean = false, z: boolean = false, w: boolean = false) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  /**
   * Serializes this boolean vector.
   */
  serialize(): BVector4Like {
    return BVector4.serialize(this)
  }

  /**
   * Serializes a boolean vector to an object.
   */
  static serialize(value: BVector4): BVector4Like {
    return {
      x: value.x,
      y: value.y,
      z: value.z,
      w: value.w
    }
  }

  /**
   * Deserializes a boolean vector from an object.
   */
  static deserialize(value: BVector4Like, out = new BVector4()): BVector4 {
    out.x = value.x
    out.y = value.y
    out.z = value.z
    out.w = value.w

    return out
  }

  /**
   * Checks whether a value is a valid boolean vector serial.
   */
  static validateSerial(value: unknown): value is BVector4Like {
    if (!value || typeof value !== 'object') {
      return false
    }

    if (!('x' in value) || !('y' in value) || !('z' in value) || !('w' in value)) {
      return false
    }

    const serial = value as BVector4Like

    return typeof serial.x === 'boolean' &&
      typeof serial.y === 'boolean' &&
      typeof serial.z === 'boolean' &&
      typeof serial.w === 'boolean'
  }
}

export type BVector4Like = {
  x: boolean
  y: boolean
  z: boolean
  w: boolean
}
