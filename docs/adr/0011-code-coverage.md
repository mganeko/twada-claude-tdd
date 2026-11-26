# 11. コードカバレッジを Node 標準機能で取得し、100% を維持する

日付: 2026-11-25

## ステータス

承認済み

## コンテキスト

TDD で書いたコードに、テストされていない部分がないことを機械的に確認したい。テストは type stripping で直接実行しており、ビルド成果物がない。

## 検討した選択肢

- **Node 標準の `--experimental-test-coverage`**: 依存を増やさず、type stripping のまま `.ts` のカバレッジが取れる。フラグ名に `experimental` が付く。
- **c8**: 安定しているが、依存が増える。標準機能で足りるため採らない。

## 決定

- Node 標準の `--experimental-test-coverage` を使い、`npm run test:coverage` で実行する。
- 対象は `src/**`、除外は `src/__tests__/**` とする。
- 行・分岐・関数のカバレッジの閾値をすべて 100% とし、下回ったら失敗させる。
- `npm run check` には含めない。

## 結果

- 実行時のコードがない `src/skittle.ts`(型だけ)は、レポートに出ない。
- 100% でもテストが十分とは限らない。この点は mutation testing(ADR 0012)で補う。
- `experimental` のフラグなので、Node の更新で挙動やフラグ名が変わる可能性がある。
