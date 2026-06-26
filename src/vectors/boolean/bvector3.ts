export class BVector3 {

  x: boolean

  y: boolean

  z: boolean

  constructor(x: boolean = false, y: boolean = false, z: boolean = false) {
    this.x = x
    this.y = y
    this.z = z
  }

  /**
   * Serializes this boolean vector.
   */
  serialize(): BVector3Like {
    return BVector3.serialize(this)
  }

  /**
   * Serializes a boolean vector to an object.
   */
  static serialize(value: BVector3): BVector3Like {
    return {
      x: value.x,
      y: value.y,
      z: value.z
    }
  }

  /**
   * Deserializes a boolean vector from an object.
   */
  static deserialize(value: BVector3Like, out = new BVector3()): BVector3 {
    out.x = value.x
    out.y = value.y
    out.z = value.z

    return out
  }

  /**
   * Checks whether a value is a valid boolean vector serial.
   */
  static validateSerial(value: unknown): value is BVector3Like {
    if (!value || typeof value !== 'object') {
      return false
    }

    if (!('x' in value) || !('y' in value) || !('z' in value)) {
      return false
    }

    const serial = value as BVector3Like

    return typeof serial.x === 'boolean' &&
      typeof serial.y === 'boolean' &&
      typeof serial.z === 'boolean'
  }
}

export type BVector3Like = {
  x: boolean
  y: boolean
  z: boolean
}
