import type { Skittle } from "./skittle.ts";

export type Points = number;

export type Throw = readonly Skittle[];

export const pointsOf = (thrown: Throw): Points => {
  const [skittle] = thrown;
  return thrown.length === 1 && skittle !== undefined ? skittle.number : thrown.length;
};
