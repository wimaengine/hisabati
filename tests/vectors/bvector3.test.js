import { test, describe } from "node:test";
import { BVector3 } from "../../dist/index.module.js";
import { deepStrictEqual, strictEqual } from "node:assert";

describe("Testing `BVector3`", () => {
    test("`BVector3` serializes correctly", () => {
        const vector = new BVector3(true, false, true)
        const serial = BVector3.serialize(vector)

        deepStrictEqual(serial, { x: true, y: false, z: true })
        deepStrictEqual(vector.serialize(), serial)
        strictEqual(BVector3.validateSerial(serial), true)
    })

    test("`BVector3` deserializes correctly", () => {
        const serial = { x: true, y: false, z: true }
        const expected = new BVector3(true, false, true)

        deepStrictEqual(BVector3.deserialize(serial), expected)
    })
})
