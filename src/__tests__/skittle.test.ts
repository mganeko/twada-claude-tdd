import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pointsOf } from "../molkky.ts";
import type { Skittle } from "../skittle.ts";

describe("Skittle", () => {
  it("範囲外の番号のスキットルは型エラーになる", () => {
    // @ts-expect-error 0 は SkittleNumber ではない
    const zero: Skittle = { number: 0 };
    // @ts-expect-error 13 は SkittleNumber ではない
    const thirteen: Skittle = { number: 13 };

    assert(zero);
    assert(thirteen);
  });

  it("number は Skittle に代入できない", () => {
    // @ts-expect-error number は Skittle ではない
    const skittle: Skittle = 5;

    assert(skittle);
  });

  it("Skittle は number に代入できない", () => {
    const skittle: Skittle = { number: 5 };

    // @ts-expect-error Skittle は number ではない
    const value: number = skittle;

    assert(value);
  });

  it("pointsOf に number を渡せない", () => {
    // @ts-expect-error number は Skittle ではない
    const call = () => pointsOf(5);

    assert(call);
  });

  it("Skittle 同士の足し算はできない", () => {
    const skittle: Skittle = { number: 5 };

    // @ts-expect-error Skittle に + 演算子は使えない
    const sum = skittle + skittle;

    assert(sum);
  });
});
