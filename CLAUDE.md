# CLAUDE.md

## コミットルール

- [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/) に従う(`feat:`、`fix:`、`docs:`、`chore:`、`test:`、`refactor:` など)
- コミットメッセージは日本語で書く
- 変更を意味のある内容ごとに分け、1コミット1つの関心事にする

## 開発の進め方

- 開発は Red/Green TDD で進める(失敗するテストを先に書き Red を確認してから、テストを通す最小の実装で Green にし、必要ならリファクタリングする)
