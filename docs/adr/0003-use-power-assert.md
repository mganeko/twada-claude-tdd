# 3. アサーションに power-assert を使う

日付: 2026-11-21

## ステータス

承認済み

## コンテキスト

失敗時に、どの値でなぜ失敗したかをすぐ把握できると TDD のサイクルが速くなる。

## 決定

`@power-assert/node` を `--import` で有効化し、`node:assert/strict` の `assert(式)` を基本の書き方とする。peer 依存の `@power-assert/runtime` も導入する。

## 結果

失敗時に式の各部分の値が図解される。テストコードは Node の標準 assert だけで書ける。
