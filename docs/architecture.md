# アーキテクチャ (現状)

題材: 限定された仕様のモルック。お題は [molkky-kata.md](molkky-kata.md)。現在は STEP 01-1(1本倒した場合)まで実装済み。

## ドメインモデル

- `src/skittle.ts`: `SkittleNumber`(1〜12 のリテラル union)と `Skittle`(`{ readonly number: SkittleNumber }`)。範囲外の番号は型で防ぐ ([ADR 0006](adr/0006-skittle-model.md))
- `src/molkky.ts`: `Points`(`number` の別名)と `pointsOf(skittle: Skittle): Points`。1本倒した場合、そのスキットルの番号が点数になる ([ADR 0007](adr/0007-points-and-points-of.md))

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
