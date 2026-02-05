import { Vector2 } from '../vectors'

export class Basis2 {

  x: Vector2

  y: Vector2

  constructor(x: Vector2 = new Vector2(1, 0), y: Vector2 = new Vector2(0, 1)) {
    this.x = x
    this.y = y
  }
}
