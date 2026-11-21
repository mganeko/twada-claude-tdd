# アーキテクチャ (現状)

題材: 限定された仕様のモルック。お題は [molkky-kata.md](molkky-kata.md)。現在は STEP 01-2(2本以上倒した場合、1本も倒さなかった場合)まで実装済み。

## ドメインモデル

- `src/skittle.ts`: `SkittleNumber`(1〜12 のリテラル union)と `Skittle`(`{ readonly number: SkittleNumber }`)。範囲外の番号は型で防ぐ ([ADR 0006](adr/0006-skittle-model.md))
- `src/molkky.ts`: `Points`(`number` の別名)、`Throw`(`readonly Skittle[]` の別名で、1回の投てきで倒したスキットル)、`pointsOf(thrown: Throw): Points`
  - 点数の規則: 1本なら倒したスキットルの番号、それ以外(0本・2本以上)なら倒した本数 ([ADR 0007](adr/0007-points-and-points-of.md)、シグネチャは [ADR 0008](adr/0008-throw-type.md) で置き換え)
  - 同じ番号のスキットルが重複した `Throw` は想定外として、`node:assert` のアサーションで落とす ([ADR 0009](adr/0009-duplicate-skittles-are-unexpected.md))

## ディレクトリ構成

- `src/` ソースコード
- `src/__tests__/` テストコード (`*.test.ts`)
- `docs/adr/` アーキテクチャ決定記録
- `docs/architecture.md` 本ドキュメント

## コマンド

| コマンド            | 内容                        |
| ------------------- | --------------------------- |
| `npm test`          | テスト実行 (type stripping) |
| `npm run typecheck` | `tsc` による型チェック      |
| `npm run lint`      | oxlint                      |
| `npm run format`    | oxfmt で整形                |
| `npm run check`     | 上記すべてを実行            |
