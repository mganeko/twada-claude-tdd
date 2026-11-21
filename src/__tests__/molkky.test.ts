import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pointsOf } from "../molkky.ts";

describe("pointsOf: 1本倒した場合", () => {
  it("5番のスキットルを倒すと5点", () => {
    assert(pointsOf({ number: 5 }) === 5);
  });

  it("12番のスキットルを倒すと12点", () => {
    assert(pointsOf({ number: 12 }) === 12);
  });
});
