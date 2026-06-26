import { test, describe } from "node:test";
import { BVector4 } from "../../dist/index.module.js";
import { deepStrictEqual, strictEqual } from "node:assert";

describe("Testing `BVector4`", () => {
    test("`BVector4` serializes correctly", () => {
        const vector = new BVector4(true, false, true, false)
        const serial = BVector4.serialize(vector)

        deepStrictEqual(serial, { x: true, y: false, z: true, w: false })
        deepStrictEqual(vector.serialize(), serial)
        strictEqual(BVector4.validateSerial(serial), true)
    })

    test("`BVector4` deserializes correctly", () => {
        const serial = { x: true, y: false, z: true, w: false }
        const expected = new BVector4(true, false, true, false)

        deepStrictEqual(BVector4.deserialize(serial), expected)
    })
})
