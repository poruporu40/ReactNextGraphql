# ベースイメージとしてNode.js 18を使用
FROM node:18

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ESLintとPrettierのインストール
RUN npm install eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier --save-dev

# JestとTesting Libraryのインストール
RUN npm install jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest --save-dev

#material ui
RUN npm install @mui/material @emotion/react @emotion/styled

# 残りのアプリケーションコードをコピー
COPY . .

# TypeScriptをビルド
RUN npm run build

# アプリケーションを起動
CMD ["npm", "start"]
