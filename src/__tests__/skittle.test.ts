import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { skittleOf, type Skittle } from "../skittle.ts";

describe("Skittle", () => {
  it("オブジェクトリテラルは Skittle に代入できない(skittleOf 経由でのみ作れる)", () => {
    // @ts-expect-error ブランドがないので Skittle ではない
    const skittle: Skittle = { number: 5 };

    assert(skittle);
  });

  it("number は Skittle に代入できない", () => {
    // @ts-expect-error number は Skittle ではない
    const skittle: Skittle = 5;

    assert(skittle);
  });

  it("Skittle は number に代入できない", () => {
    const skittle = skittleOf(5);

    // @ts-expect-error Skittle は number ではない
    const value: number = skittle;

    assert(value);
  });

  it("Skittle 同士の足し算はできない", () => {
    const skittle = skittleOf(5);

    // @ts-expect-error Skittle に + 演算子は使えない
    const sum = skittle + skittle;

    assert(sum);
  });
});

describe("skittleOf", () => {
  it("5番のスキットルを作れる", () => {
    const skittle = skittleOf(5);

    assert(skittle.number === 5);
  });

  it("0番は存在しないので、アサーションで落ちる", () => {
    // @ts-expect-error 0 は SkittleNumber ではない
    const call = () => skittleOf(0);

    assert.throws(call, assert.AssertionError);
  });

  it("13番は存在しないので、アサーションで落ちる", () => {
    // @ts-expect-error 13 は SkittleNumber ではない
    const call = () => skittleOf(13);

    assert.throws(call, assert.AssertionError);
  });

  it("1.5番のように整数でない番号は、アサーションで落ちる", () => {
    // @ts-expect-error 1.5 は SkittleNumber ではない
    const call = () => skittleOf(1.5);

    assert.throws(call, assert.AssertionError);
  });

  it("NaN は、アサーションで落ちる", () => {
    // @ts-expect-error NaN は SkittleNumber ではない
    const call = () => skittleOf(NaN);

    assert.throws(call, assert.AssertionError);
  });

  it("境界の1番と12番は作れる", () => {
    assert(skittleOf(1).number === 1);
    assert(skittleOf(12).number === 12);
  });

  it("範囲外のとき、アサーションエラーのメッセージで原因が分かる", () => {
    // @ts-expect-error 0 は SkittleNumber ではない
    const call = () => skittleOf(0);

    assert.throws(call, {
      name: "AssertionError",
      message: "スキットル番号は1〜12の整数でなければならない",
    });
  });
});
