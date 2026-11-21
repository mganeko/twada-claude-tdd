import type { Skittle } from "./skittle.ts";

export type Points = number;

export type Throw = readonly Skittle[];

export const pointsOf = (thrown: Throw): Points => {
  const [only, ...rest] = thrown;
  return only !== undefined && rest.length === 0 ? only.number : thrown.length;
};
