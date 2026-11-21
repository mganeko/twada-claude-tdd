import type { Skittle } from "./skittle.ts";

export type Points = number;

export type Throw = readonly Skittle[];

export const pointsOf = (thrown: Throw): Points => {
  const [skittle] = thrown;
  return skittle === undefined ? 0 : skittle.number;
};
