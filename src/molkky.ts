import assert from "node:assert/strict";
import type { Skittle } from "./skittle.ts";

export type Points = number;

export type Throw = readonly Skittle[];

export const pointsOf = (thrown: Throw): Points => {
  const distinctCount = new Set(thrown.map((skittle) => skittle.number)).size;
  assert(distinctCount === thrown.length, "同じ番号のスキットルは重複できない");

  const [only, ...rest] = thrown;
  return only !== undefined && rest.length === 0 ? only.number : thrown.length;
};
