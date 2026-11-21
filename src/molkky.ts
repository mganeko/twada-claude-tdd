import type { Skittle } from "./skittle.ts";

export type Points = number;

export const pointsOf = (skittle: Skittle): Points => skittle.number;
