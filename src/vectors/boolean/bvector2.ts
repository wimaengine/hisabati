export class BVector2 {

  x: boolean

  y: boolean

  constructor(x: boolean = false, y: boolean = false) {
    this.x = x
    this.y = y
  }

  /**
   * Serializes this boolean vector.
   */
  serialize(): BVector2Like {
    return BVector2.serialize(this)
  }

  /**
   * Serializes a boolean vector to an object.
   */
  static serialize(value: BVector2): BVector2Like {
    return {
      x: value.x,
      y: value.y
    }
  }

  /**
   * Deserializes a boolean vector from an object.
   */
  static deserialize(value: BVector2Like, out = new BVector2()): BVector2 {
    out.x = value.x
    out.y = value.y

    return out
  }

  /**
   * Checks whether a value is a valid boolean vector serial.
   */
  static validateSerial(value: unknown): value is BVector2Like {
    if (!value || typeof value !== 'object') {
      return false
    }

    if (!('x' in value) || !('y' in value)) {
      return false
    }

    const serial = value as BVector2Like

    return typeof serial.x === 'boolean' && typeof serial.y === 'boolean'
  }
}

export type BVector2Like = {
  x: boolean
  y: boolean
}
