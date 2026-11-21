import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pointsOf } from "../molkky.ts";

describe("pointsOf: 1本倒した場合", () => {
  it("5番のスキットルを倒すと5点", () => {
    assert(pointsOf({ number: 5 }) === 5);
  });
});
