import { test, describe } from "node:test";
import { Angle } from "../../dist/index.module.js";
import { deepStrictEqual, strictEqual } from "node:assert";

describe("Testing `Angle`", () => {
    test("`Angle` constructor works correctly", () => {
        const angle = new Angle(1.5)

        strictEqual(angle.value, 1.5)
    })

    test("`Angle` serializes correctly", () => {
        const angle = new Angle(1.5)
        const serial = Angle.serialize(angle)

        strictEqual(serial, 1.5)
        strictEqual(angle.serialize(), serial)
        strictEqual(Angle.validateSerial(serial), true)
    })

    test("`Angle` deserializes correctly", () => {
        const serial = 1.5
        const expected = new Angle(1.5)

        deepStrictEqual(Angle.deserialize(serial), expected)
    })
})
