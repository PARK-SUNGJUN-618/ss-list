# Frontend

このディレクトリは、ポートフォリオ・管理画面・各Webアプリケーションを提供するReactアプリケーションです。

全体の機能・構成・開発環境の前提は[ルートのREADME](../README.md)を参照してください。

## 基本コマンド

以下は`client/`内で実行する、`package.json`に定義されたコマンドです。

| コマンド | 内容 |
| --- | --- |
| `npm start` | Frontendの開発サーバーを起動 |
| `npm run build` | Frontendのビルド |
| `npm test` | テストランナーを起動 |

Portfolio・SSList・SSDiaryの利用にはBackendとMongoDBも必要です。ルートの`npm run dev`でFrontendとBackendを同時に起動できます。

インストール・起動・ビルド・テストの実行結果は未検証です。依存関係と初期データに関する注意点はルートのREADMEに記載しています。
