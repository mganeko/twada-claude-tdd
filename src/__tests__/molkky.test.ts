import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pointsOf, type Throw } from "../molkky.ts";
import type { Skittle } from "../skittle.ts";

describe("pointsOf: 1本倒した場合", () => {
  it("5番のスキットルを倒すと5点", () => {
    const skittle: Skittle = { number: 5 };

    assert(pointsOf([skittle]) === 5);
  });

  it("12番のスキットルを倒すと12点", () => {
    const skittle: Skittle = { number: 12 };

    assert(pointsOf([skittle]) === 12);
  });
});

describe("pointsOf: 2本以上倒した場合", () => {
  it("5番と8番のスキットルを倒すと2点(倒した本数)", () => {
    const thrown: Throw = [{ number: 5 }, { number: 8 }];

    assert(pointsOf(thrown) === 2);
  });
});
});

describe("pointsOf: 型", () => {
  it("pointsOf に number を渡せない", () => {
    // @ts-expect-error number は Skittle ではない
    const call = () => pointsOf(5);

    assert(call);
  });
});
