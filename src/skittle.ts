import assert from "node:assert/strict";

export type SkittleNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

declare const skittleBrand: unique symbol;

export type Skittle = {
  readonly number: SkittleNumber;
  readonly [skittleBrand]: true;
};

export const skittleOf = (value: SkittleNumber): Skittle => {
  assert(
    Number.isInteger(value) && value >= 1 && value <= 12,
    "スキットル番号は1〜12の整数でなければならない",
  );
  return { number: value } as Skittle;
};
