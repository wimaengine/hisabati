import { describe, test } from "node:test";
import {
  clamp,
  snap,
  snapDown,
  snapUp,
  smoothStep,
  smootherStep,
  mapToIndex2D,
  mapToIndex3D,
  lerp,
  inverseLerp,
  remap,
  Interpolation,
  sq,
  exp,
  sqrt,
  invert,
  round,
  naturalizePair,
  degToRad,
  radToDeg,
  wrap,
  cantorPair,
  cantorPairSigned,
  fuzzyEqual,
  rand,
  Vector2,
  Vector3,
  TAU,
  PI,
} from "../../dist/index.module.js";
import { strictEqual, deepStrictEqual, ok } from "node:assert";

const EPS = 1e-10;
function approx(actual, expected, eps = EPS) {
  ok(Math.abs(actual - expected) <= eps, `Expected ${actual} to be within ${eps} of ${expected}`);
};

describe("Functions: clamp/snap", () => {
  test("clamp clamps below/above and keeps inside range", () => {
    strictEqual(clamp(-1, 0, 10), 0);
    strictEqual(clamp(11, 0, 10), 10);
    strictEqual(clamp(5, 0, 10), 5);
  });

  test("clamp respects exact bounds", () => {
    strictEqual(clamp(0, 0, 10), 0);
    strictEqual(clamp(10, 0, 10), 10);
  });

  test("snap rounds to nearest step", () => {
    strictEqual(snap(5.1, 1), 5);
    strictEqual(snap(5.5, 1), 6);
    strictEqual(snap(-2.4, 1), -2);
  });

  test("snapDown/snapUp behave as floor/ceil to step", () => {
    strictEqual(snapDown(5.9, 1), 5);
    strictEqual(snapDown(-2.1, 1), -3);
    strictEqual(snapUp(5.1, 1), 6);
    strictEqual(snapUp(-2.1, 1), -2);
  });

  test("snap with fractional steps", () => {
    approx(snap(1.26, 0.1), 1.3);
    approx(snapDown(1.26, 0.1), 1.2);
    approx(snapUp(1.21, 0.1), 1.3);
  });
});

describe("Functions: easing", () => {
  test("smoothStep and smootherStep handle endpoints", () => {
    strictEqual(smoothStep(0), 0);
    strictEqual(smoothStep(1), 1);
    strictEqual(smootherStep(0), 0);
    strictEqual(smootherStep(1), 1);
  });

  test("smoothStep midpoint is 0.5", () => {
    approx(smoothStep(0.5), 0.5);
  });
});

describe("Functions: index mapping", () => {
  test("mapToIndex2D maps linear index", () => {
    deepStrictEqual(mapToIndex2D(0, 4), new Vector2(0, 0));
    deepStrictEqual(mapToIndex2D(3, 4), new Vector2(3, 0));
    deepStrictEqual(mapToIndex2D(4, 4), new Vector2(0, 1));
    deepStrictEqual(mapToIndex2D(9, 4), new Vector2(1, 2));
  });

  test("mapToIndex3D maps linear index", () => {
    deepStrictEqual(mapToIndex3D(0, 2, 2), new Vector3(0, 0, 0));
    deepStrictEqual(mapToIndex3D(1, 2, 2), new Vector3(1, 0, 0));
    deepStrictEqual(mapToIndex3D(2, 2, 2), new Vector3(0, 1, 0));
    deepStrictEqual(mapToIndex3D(3, 2, 2), new Vector3(1, 1, 0));
    deepStrictEqual(mapToIndex3D(4, 2, 2), new Vector3(0, 0, 1));
  });
});

describe("Functions: interpolation", () => {
  test("lerp endpoints", () => {
    strictEqual(lerp(10, 20, 0), 10);
    strictEqual(lerp(10, 20, 1), 20);
    strictEqual(lerp(-10, 10, 0.5), 0);
  });

  test("inverseLerp returns t", () => {
    strictEqual(inverseLerp(10, 20, 10), 0);
    strictEqual(inverseLerp(10, 20, 20), 1);
    strictEqual(inverseLerp(10, 20, 15), 0.5);
  });

  test("remap maps ranges", () => {
    strictEqual(remap(0, 0, 1, 10, 20), 10);
    strictEqual(remap(1, 0, 1, 10, 20), 20);
    strictEqual(remap(0.5, 0, 1, 10, 20), 15);
  });

  test("Interpolation.Linear matches lerp", () => {
    strictEqual(Interpolation.Linear(10, 20, 0), 10);
    strictEqual(Interpolation.Linear(10, 20, 1), 20);
    strictEqual(Interpolation.Linear(10, 20, 0.5), 15);
  });

  test("Interpolation.CatmullRom endpoints", () => {
    strictEqual(Interpolation.CatmullRom(0, 1, 2, 3, 0), 1);
    strictEqual(Interpolation.CatmullRom(0, 1, 2, 3, 1), 2);
  });

  test("Interpolation.cosine endpoints", () => {
    approx(Interpolation.cosine(10, 20, 0), 10);
    approx(Interpolation.cosine(10, 20, 1), 20);
  });
});

describe("Functions: math", () => {
  test("sq", () => {
    strictEqual(sq(3), 9);
    strictEqual(sq(-4), 16);
  });

  test("exp", () => {
    strictEqual(exp(3), 9);
    strictEqual(exp(2, 3), 8);
    strictEqual(exp(-2, 2), 4);
  });

  test("sqrt", () => {
    strictEqual(sqrt(9), 3);
    ok(Number.isNaN(sqrt(-1)));
  });

  test("invert", () => {
    strictEqual(invert(2), 0.5);
    strictEqual(invert(-4), -0.25);
  });

  test("round", () => {
    strictEqual(round(1.23456), 1.2346);
    strictEqual(round(1.23456, 2), 1.23);
    strictEqual(round(-1.23456, 3), -1.235);
  });

  test("naturalizePair ordering", () => {
    strictEqual(naturalizePair(0, 0), 0);
    strictEqual(naturalizePair(1, 0), 2);
    strictEqual(naturalizePair(0, 1), 2);
    strictEqual(naturalizePair(2, 1), 8);
  });

  test("degToRad", () => {
    approx(degToRad(180), PI);
    approx(degToRad(360), TAU);
  });

  test("radToDeg", () => {
    approx(radToDeg(PI), 180);
    approx(radToDeg(TAU), 360);
  });

  test("wrap keeps values within range", () => {
    strictEqual(wrap(5, 0, 10), 5);
    strictEqual(wrap(10, 0, 10), 0);
    strictEqual(wrap(12, 0, 10), 2);
    strictEqual(wrap(-1, 0, 10), 9);
  });

  test("cantorPair", () => {
    strictEqual(cantorPair(0, 0), 0);
    strictEqual(cantorPair(1, 0), 1);
    strictEqual(cantorPair(0, 1), 2);
    strictEqual(cantorPair(2, 1), 7);
  });

  test("cantorPairSigned maps signed pairs", () => {
    strictEqual(cantorPairSigned(0, 0), 0);
    strictEqual(cantorPairSigned(1, 0), 3);
    strictEqual(cantorPairSigned(-1, 0), 1);
    strictEqual(cantorPairSigned(0, -1), 2);
    strictEqual(cantorPairSigned(1, -1), 7);
    strictEqual(cantorPairSigned(2, 1), 23);
  });

  test("fuzzyEqual tolerance", () => {
    ok(fuzzyEqual(1, 1));
    ok(fuzzyEqual(1, 1 + 1e-8, 1e-6));
    ok(!fuzzyEqual(1, 1.01, 1e-4));
  });
});

describe("Functions: random", () => {
  test("rand returns within range", () => {
    for (let i = 0; i < 1000; i += 1) {
      const value = rand(-2, 3);
      ok(value >= -2);
      ok(value < 3);
    }
  });

  test("rand min equals max", () => {
    strictEqual(rand(5, 5), 5);
  });
});
