# 8. 投てきを Throw 型として表し、pointsOf を置き換える

日付: 2026-11-22

## ステータス

承認済み(ADR 0007 の `pointsOf` のシグネチャを置き換える)

## コンテキスト

STEP 01-2 で、1回の投てきで2本以上、または1本も倒さない場合が仕様に加わった。お題は「投てき(throw)」と「点数(points)」を用語として定義しており、点数は投てきに対して決まる。

## 決定

- `Throw` を `readonly Skittle[]` の別名とする。投てきに他の情報が付くまで、オブジェクトで包まない。
- `pointsOf` を `pointsOf(throw: Throw): Points` に置き換える。`pointsOf(skittle: Skittle)` は残さない。
- 点数の規則は、1本なら倒したスキットルの番号、それ以外(0本・2本以上)なら倒した本数とする。
- 可変長引数 `pointsOf(...skittles)` は採らない。投てきを値として持てるようにするため。
- `Throw` と `pointsOf` は引き続き `src/molkky.ts` に置く。

## 結果

- お題の用語が型に現れ、今後の STEP(投てきの履歴など)でも使い回せる。
- 既存のテストは `pointsOf([skittle])` の形に直す。
- 重複の扱いは ADR 0009 で決める。
