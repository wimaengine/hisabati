import { test, describe } from "node:test";
import { Basis3, Vector3 } from "../../dist/index.module.js";
import { deepStrictEqual, strictEqual } from "node:assert";

describe("Testing `Basis3`", () => {
    test("`Basis3` constructor works correctly", () => {
        const basis = new Basis3()

        deepStrictEqual(
            basis,
            new Basis3(
                new Vector3(1, 0, 0),
                new Vector3(0, 1, 0),
                new Vector3(0, 0, 1)
            )
        )
    })

    test("`Basis3` serializes correctly", () => {
        const basis = new Basis3(
            new Vector3(1, 2, 3),
            new Vector3(4, 5, 6),
            new Vector3(7, 8, 9)
        )
        const serial = Basis3.serialize(basis)

        deepStrictEqual(serial, {
            x: { x: 1, y: 2, z: 3 },
            y: { x: 4, y: 5, z: 6 },
            z: { x: 7, y: 8, z: 9 }
        })
        deepStrictEqual(basis.serialize(), serial)
        strictEqual(Basis3.validateSerial(serial), true)
    })

    test("`Basis3` deserializes correctly", () => {
        const serial = {
            x: { x: 1, y: 2, z: 3 },
            y: { x: 4, y: 5, z: 6 },
            z: { x: 7, y: 8, z: 9 }
        }
        const expected = new Basis3(
            new Vector3(1, 2, 3),
            new Vector3(4, 5, 6),
            new Vector3(7, 8, 9)
        )

        deepStrictEqual(Basis3.deserialize(serial), expected)
    })
})
