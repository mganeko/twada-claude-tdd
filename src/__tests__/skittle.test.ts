import { describe, it } from "node:test";
import assert from "node:assert/strict";
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
});
