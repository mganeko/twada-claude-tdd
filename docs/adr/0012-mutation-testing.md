# 12. mutation testing を Stryker と tap-runner で行う

日付: 2026-11-25

## ステータス

承認済み

## コンテキスト

カバレッジが 100% でも、テストが振る舞いを確かめているとは限らない。コードを少し変えたとき(ミュータント)にテストが失敗するかを調べ、テストの質を確認したい。

## 検討した選択肢

- **Stryker + tap-runner**: `node:test` の TAP 出力を読んで、ミュータントの生死を判定する。採用する。
- **Stryker の typescript-checker**: 型エラーになるミュータントを除外する。Stryker が TypeScript の JS API を使うため、TS 7(ネイティブ版)では使えない。

## 決定

- `@stryker-mutator/core` と `@stryker-mutator/tap-runner` を使い、`npm run test:mutation` で実行する。
- TS 7 では、Stryker 本体が `ts.parseConfigFileTextToJson` を呼んで落ちるため、`ignorePatterns` で `tsconfig.json` をサンドボックスから除外する。テストは type stripping で動くので、サンドボックスに `tsconfig.json` は不要。
- tap-runner はテストファイルを `node` で直接実行して TAP を読むため、`nodeArgs` に `--test-reporter=tap` を指定する。指定しないと、ミュータントによるテスト失敗(終了コード1)が実行エラーとして扱われる。
- `coverageAnalysis` は tap-runner が対応しないため `off` とする。すべてのミュータントが全テストを実行する。
- mutation score の閾値 `thresholds.break` を 100 とし、下回ったら失敗させる。
- レポートは `clear-text` と `html` を出力する。HTML は `reports/mutation/` に出し、git の管理外とする。
- `npm run check` には含めない。

## 結果

- 型エラーになるミュータントは除外されず、ふつうに実行される。
- Stryker 本体が TypeScript の JS API に依存しているため、Stryker や TypeScript の更新で、この回避策が壊れる可能性がある。
- `break: 100` により、生き残ったミュータントがあれば失敗する。意図的に残す場合は、除外の設定を追加し、理由を ADR に記録する。
