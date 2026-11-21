import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pointsOf } from "../molkky.ts";
import type { Skittle } from "../skittle.ts";

describe("pointsOf: 1本倒した場合", () => {
  it("5番のスキットルを倒すと5点", () => {
    const skittle: Skittle = { number: 5 };

    assert(pointsOf(skittle) === 5);
  });

  it("12番のスキットルを倒すと12点", () => {
    const skittle: Skittle = { number: 12 };

    assert(pointsOf(skittle) === 12);
  });

  it("範囲外の番号のスキットルは型エラーになる", () => {
    // @ts-expect-error 0 は SkittleNumber ではない
    const zero: Skittle = { number: 0 };
    // @ts-expect-error 13 は SkittleNumber ではない
    const thirteen: Skittle = { number: 13 };

    pointsOf(zero);
    pointsOf(thirteen);
  });
});
