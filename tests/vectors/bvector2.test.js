import { test, describe } from "node:test";
import { BVector2 } from "../../dist/index.module.js";
import { deepStrictEqual, strictEqual } from "node:assert";

describe("Testing `BVector2`", () => {
    test("`BVector2` serializes correctly", () => {
        const vector = new BVector2(true, false)
        const serial = BVector2.serialize(vector)

        deepStrictEqual(serial, { x: true, y: false })
        deepStrictEqual(vector.serialize(), serial)
        strictEqual(BVector2.validateSerial(serial), true)
    })

    test("`BVector2` deserializes correctly", () => {
        const serial = { x: true, y: false }
        const expected = new BVector2(true, false)

        deepStrictEqual(BVector2.deserialize(serial), expected)
    })
})
