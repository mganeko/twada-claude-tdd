# 2. テストは type stripping で直接実行する

日付: 2026-11-21

## ステータス

承認済み

## コンテキスト

TDD ではテスト実行までの待ち時間を短くしたい。ビルド工程は不要にしたい。

## 決定

テストは `node:test` を使い、コンパイルせず Node 組み込みの type stripping で `.ts` を直接実行する。テストは `src/__tests__/*.test.ts` に置く。

## 結果

ビルド不要で `npm test` がすぐ走る。ただし `erasableSyntaxOnly` と `verbatimModuleSyntax` が必須で、enum・namespace は使えず、相対 import は `.ts` 拡張子付きで書く。実行時に ExperimentalWarning が出る。
