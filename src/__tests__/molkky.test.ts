import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pointsOf, scoreHistoryOf, scoreOf, type Throw } from "../molkky.ts";
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

  it("アサーションエラーのメッセージで重複が原因だと分かる", () => {
    const thrown: Throw = [{ number: 5 }, { number: 5 }];

    assert.throws(() => pointsOf(thrown), {
      name: "AssertionError",
      message: "同じ番号のスキットルは重複できない",
    });
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

describe("scoreOf: 投てきの履歴から得点を求める", () => {
  it("1回も投てきしていないときは0点", () => {
    const throws: readonly Throw[] = [];

    assert(scoreOf(throws) === 0);
  });

  it("1回目に5番を1本倒すと5点", () => {
    const throws: readonly Throw[] = [[{ number: 5 }]];

    assert(scoreOf(throws) === 5);
  });

  it("1回目に5番を1本、2回目に11番を1本倒すと16点", () => {
    const throws: readonly Throw[] = [[{ number: 5 }], [{ number: 11 }]];

    assert(scoreOf(throws) === 16);
  });

  it("1回目に5番と8番を倒し(2点)、2回目に11番を1本倒す(11点)と13点", () => {
    const throws: readonly Throw[] = [[{ number: 5 }, { number: 8 }], [{ number: 11 }]];

    assert(scoreOf(throws) === 13);
  });

  it("別の投てきで同じ番号を倒しても、それぞれ点数になる(5番を2回で10点)", () => {
    const throws: readonly Throw[] = [[{ number: 5 }], [{ number: 5 }]];

    assert(scoreOf(throws) === 10);
  });

  it("1回投てきして1本も倒さなければ0点", () => {
    const throws: readonly Throw[] = [[]];

    assert(scoreOf(throws) === 0);
  });

  it("1本も倒さない投てきを挟んでも、ほかの投てきの点数が合計される", () => {
    const throws: readonly Throw[] = [[], [{ number: 5 }]];

    assert(scoreOf(throws) === 5);
  });
});

describe("scoreOf: 型", () => {
  it("scoreOf に投てき(Throw)を1つ渡せない", () => {
    const thrown: Throw = [{ number: 5 }];

    // @ts-expect-error Throw は readonly Throw[] ではない
    const call = () => scoreOf(thrown);

    assert(call);
  });
});

describe("scoreHistoryOf: 各投てき終了時点の得点を求める", () => {
  it("1回も投てきしていないときは空", () => {
    const throws: readonly Throw[] = [];

    assert.deepEqual(scoreHistoryOf(throws), []);
  });

  it("1回目に5番を1本倒すと[5]", () => {
    const throws: readonly Throw[] = [[{ number: 5 }]];

    assert.deepEqual(scoreHistoryOf(throws), [5]);
  });

  it("お題の例: 5本、11番を1本、空振り、3本の順に投げると[5, 16, 16, 19]", () => {
    const throws: readonly Throw[] = [
      [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }],
      [{ number: 11 }],
      [],
      [{ number: 7 }, { number: 8 }, { number: 9 }],
    ];

    assert.deepEqual(scoreHistoryOf(throws), [5, 16, 16, 19]);
  });

  it("最初の投てきで1本も倒さなければ、その時点の得点は0点", () => {
    const throws: readonly Throw[] = [[], [{ number: 5 }]];

    assert.deepEqual(scoreHistoryOf(throws), [0, 5]);
  });
});

describe("scoreHistoryOf: 型", () => {
  it("scoreHistoryOf に投てき(Throw)を1つ渡せない", () => {
    const thrown: Throw = [{ number: 5 }];

    // @ts-expect-error Throw は readonly Throw[] ではない
    const call = () => scoreHistoryOf(thrown);

    assert(call);
  });
});
