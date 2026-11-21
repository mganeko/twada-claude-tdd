# 4. linter に oxlint、formatter に oxfmt を使う

日付: 2026-11-21

## ステータス

承認済み

## コンテキスト

高速で設定の少ない静的解析・整形ツールを使いたい。

## 決定

linter は oxlint(`correctness` カテゴリをエラー)、formatter は oxfmt(デフォルト設定)を使う。

## 結果

lint と整形は `npm run lint` / `npm run format` で一瞬で終わる。
