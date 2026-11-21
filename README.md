# twada-claude-tdd

TDD 学習のため、限定された仕様のモルックを題材にプログラミング演習を行うプロジェクト。

## 必要環境

- Node 26

## セットアップ

```sh
npm install
```

## コマンド

| コマンド            | 内容                                     |
| ------------------- | ---------------------------------------- |
| `npm test`          | テスト実行 (type stripping)              |
| `npm run typecheck` | `tsc` による型チェック                   |
| `npm run lint`      | oxlint                                   |
| `npm run format`    | oxfmt で整形                             |
| `npm run check`     | 型チェック・lint・整形確認・テストを実行 |

## ドキュメント

- [現状の設計](docs/architecture.md)
- [ADR](docs/adr/)
