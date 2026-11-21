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

  it("1番・2番・3番のスキットルを倒すと3点(倒した本数)", () => {
    const thrown: Throw = [{ number: 1 }, { number: 2 }, { number: 3 }];

    assert(pointsOf(thrown) === 3);
  });
});

describe("pointsOf: 1本も倒さなかった場合", () => {
  it("1本も倒さなければ0点", () => {
    const thrown: Throw = [];

    assert(pointsOf(thrown) === 0);
  });
});

describe("pointsOf: 同じ番号のスキットルが重複した場合", () => {
  it("5番が2本含まれていると想定外としてアサーションで落ちる", () => {
    const thrown: Throw = [{ number: 5 }, { number: 5 }];

    assert.throws(() => pointsOf(thrown), assert.AssertionError);
  });

  it("5番・8番・5番のように離れた位置の重複も想定外としてアサーションで落ちる", () => {
    const thrown: Throw = [{ number: 5 }, { number: 8 }, { number: 5 }];

    assert.throws(() => pointsOf(thrown), assert.AssertionError);
  });
});

describe("pointsOf: 型", () => {
  it("pointsOf に number を渡せない", () => {
    // @ts-expect-error number は Skittle ではない
    const call = () => pointsOf(5);

    assert(call);
  });
});
