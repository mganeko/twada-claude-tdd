# 14. Skittle を skittleOf 経由でのみ作れるブランド型にする

日付: 2026-11-25

## ステータス

承認済み(ADR 0006 の「ファクトリを作らない」「ランタイム検証を持たない」を置き換える)

## コンテキスト

ADR 0006 では、範囲外の番号を `SkittleNumber`(リテラル union)の型だけで防ぎ、実行時の検証は持たなかった。型は、型アサーション、`any`、JSON など外から来た値によって迂回できる。実行時にまったくガードがない状態は避けたい。

また、`Skittle` が `{ readonly number: SkittleNumber }` という構造的な型のままでは、ファクトリ関数を追加しても、リテラル `{ number: 5 }` で迂回できてしまう。

## 決定

- `Skittle` にブランド(型だけの宣言 `declare const skittleBrand: unique symbol`)を付け、リテラルでは作れない型にする。
- `skittleOf(value: SkittleNumber): Skittle` を追加し、`Skittle` を作る唯一の手段とする。
- `skittleOf` は `node:assert` で `Number.isInteger(value) && value >= 1 && value <= 12` を表明する。範囲外・小数・`NaN` は、`AssertionError` で落とす。
- 引数の型は `SkittleNumber` とする。範囲外の指定は、引き続きコンパイル時に型エラーになる。実行時の表明は、型を迂回された場合の二重の防御である。
- 表明を通った値に、型アサーション(`as Skittle`)でブランドを付ける。型アサーションは `skittleOf` の1か所だけに限る。
- `pointsOf` は、スキットルごとの表明を持たない。構築時に検証済みだからである。重複の表明(ADR 0009)は、そのまま `pointsOf` に残す。
- 外部から来た `number` を `Skittle` に変換する入力境界の設計は、必要になった時点で別に行う。
- 表明のメッセージは日本語とする。

## 結果

- `Skittle` の値は、必ず表明を通ったものになる。不変条件が構築時の1か所に集まる。
- テストを含め、`{ number: N }` のリテラルは使えなくなり、`skittleOf(N)` に移行する。
- 範囲外の表明は、実行時のテストで検証する。カバレッジと mutation testing(ADR 0011・0012)の閾値 100% も満たす。
- `src/skittle.ts` に、実行時のコードが初めて入る。
