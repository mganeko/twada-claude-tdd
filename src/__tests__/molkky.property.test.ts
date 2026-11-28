import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";
import { pointsOf, scoreHistoryOf, scoreOf, type Throw } from "../molkky.ts";
import { skittleOf, type SkittleNumber } from "../skittle.ts";

const skittleNumbers: readonly SkittleNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const skittleArb = fc.constantFrom(...skittleNumbers).map(skittleOf);

// 1回の投てき: 同じ番号は重複しない(0〜12本)
const throwArb: fc.Arbitrary<Throw> = fc
  .uniqueArray(fc.constantFrom(...skittleNumbers), { maxLength: 12 })
  .map((numbers) => numbers.map(skittleOf));

// items の並べ替え(順列)を生成する。乱数のキーで整列して、順序だけを入れ替える
const permutationOf = <T>(items: readonly T[]): fc.Arbitrary<readonly T[]> =>
  fc
    .array(fc.double({ noNaN: true }), { minLength: items.length, maxLength: items.length })
    .map((keys) =>
      items
        .map((item, index) => ({ item, key: keys[index] ?? 0 }))
        .sort((a, b) => a.key - b.key)
        .map(({ item }) => item),
    );

const throwsArb = fc.array(throwArb, { maxLength: 20 });

describe("skittleOf: プロパティ", () => {
  it("1〜12の整数なら、同じ番号のスキットルを作れる", () => {
    fc.assert(
      fc.property(fc.constantFrom(...skittleNumbers), (value) => {
        assert(skittleOf(value).number === value);
      }),
    );
  });

  it("1〜12の範囲外の整数は、アサーションで落ちる", () => {
    fc.assert(
      fc.property(
        fc.integer().filter((value) => value < 1 || value > 12),
        (value) => {
          assert.throws(() => skittleOf(value as SkittleNumber), assert.AssertionError);
        },
      ),
    );
  });

  it("整数でない数は、アサーションで落ちる", () => {
    fc.assert(
      fc.property(fc.double({ noInteger: true }), (value) => {
        assert.throws(() => skittleOf(value as SkittleNumber), assert.AssertionError);
      }),
    );
  });
});

describe("pointsOf: プロパティ", () => {
  it("1本倒したら、そのスキットルの番号が点数になる", () => {
    fc.assert(
      fc.property(skittleArb, (skittle) => {
        assert(pointsOf([skittle]) === skittle.number);
      }),
    );
  });

  it("0本または2本以上倒したら、倒した本数が点数になる", () => {
    fc.assert(
      fc.property(
        throwArb.filter((thrown) => thrown.length !== 1),
        (thrown) => {
          assert(pointsOf(thrown) === thrown.length);
        },
      ),
    );
  });

  it("点数は0以上12以下", () => {
    fc.assert(
      fc.property(throwArb, (thrown) => {
        const points = pointsOf(thrown);

        assert(points >= 0 && points <= 12);
      }),
    );
  });

  it("倒したスキットルの順序によらず、点数は同じ", () => {
    fc.assert(
      fc.property(
        throwArb.chain((thrown) => fc.tuple(fc.constant(thrown), permutationOf(thrown))),
        ([thrown, shuffled]) => {
          assert(pointsOf(shuffled) === pointsOf(thrown));
        },
      ),
    );
  });

  it("同じ番号を含む投てきは、アサーションで落ちる", () => {
    fc.assert(
      fc.property(throwArb, skittleArb, (thrown, duplicated) => {
        const withDuplicate: Throw = [...thrown, duplicated, duplicated];

        assert.throws(() => pointsOf(withDuplicate), assert.AssertionError);
      }),
    );
  });
});

describe("scoreOf: プロパティ", () => {
  it("投てきがなければ0点", () => {
    assert(scoreOf([]) === 0);
  });

  it("投てきを連結した得点は、それぞれの得点の和になる", () => {
    fc.assert(
      fc.property(throwsArb, throwsArb, (first, second) => {
        assert(scoreOf([...first, ...second]) === scoreOf(first) + scoreOf(second));
      }),
    );
  });

  it("投てきの順序によらず、得点は同じ", () => {
    fc.assert(
      fc.property(
        throwsArb.chain((throws) => fc.tuple(fc.constant(throws), permutationOf(throws))),
        ([throws, shuffled]) => {
          assert(scoreOf(shuffled) === scoreOf(throws));
        },
      ),
    );
  });

  it("得点は、各投てきの点数が0以上なので、投てきを重ねても減らない", () => {
    fc.assert(
      fc.property(throwsArb, throwArb, (throws, next) => {
        assert(scoreOf([...throws, next]) >= scoreOf(throws));
      }),
    );
  });
});

describe("scoreHistoryOf: プロパティ", () => {
  it("要素数は投てきの回数と同じ", () => {
    fc.assert(
      fc.property(throwsArb, (throws) => {
        assert(scoreHistoryOf(throws).length === throws.length);
      }),
    );
  });

  it("最後の要素は、現在の得点(scoreOf)と一致する", () => {
    fc.assert(
      fc.property(
        throwsArb.filter((throws) => throws.length > 0),
        (throws) => {
          assert(scoreHistoryOf(throws).at(-1) === scoreOf(throws));
        },
      ),
    );
  });

  it("i回目の要素は、先頭からi回目までの得点と一致する", () => {
    fc.assert(
      fc.property(throwsArb, (throws) => {
        scoreHistoryOf(throws).forEach((score, index) => {
          assert(score === scoreOf(throws.slice(0, index + 1)));
        });
      }),
    );
  });

  it("得点の推移は、減らない", () => {
    fc.assert(
      fc.property(throwsArb, (throws) => {
        const history = scoreHistoryOf(throws);

        history.forEach((score, index) => {
          assert(score >= (history[index - 1] ?? 0));
        });
      }),
    );
  });
});
