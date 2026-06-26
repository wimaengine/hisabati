import { test, describe } from "node:test";
import { Basis2, Vector2 } from "../../dist/index.module.js";
import { deepStrictEqual, strictEqual } from "node:assert";

describe("Testing `Basis2`", () => {
    test("`Basis2` constructor works correctly", () => {
        const basis = new Basis2()

        deepStrictEqual(basis, new Basis2(new Vector2(1, 0), new Vector2(0, 1)))
    })

    test("`Basis2` serializes correctly", () => {
        const basis = new Basis2(new Vector2(1, 2), new Vector2(3, 4))
        const serial = Basis2.serialize(basis)

        deepStrictEqual(serial, {
            x: { x: 1, y: 2 },
            y: { x: 3, y: 4 }
        })
        deepStrictEqual(basis.serialize(), serial)
        strictEqual(Basis2.validateSerial(serial), true)
    })

    test("`Basis2` deserializes correctly", () => {
        const serial = {
            x: { x: 1, y: 2 },
            y: { x: 3, y: 4 }
        }
        const expected = new Basis2(new Vector2(1, 2), new Vector2(3, 4))

        deepStrictEqual(Basis2.deserialize(serial), expected)
    })
})
