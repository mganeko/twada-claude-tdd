# アーキテクチャ (現状)

題材: 限定された仕様のモルック。ドメインコードはまだ存在しない。

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
