# ベースイメージを指定
FROM node:16-alpine

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# Generate Prisma client
RUN npx prisma generate
# マイグレーションの実行 ここで実行するとmariadbコンテナが起動していない事があるからやらない。docker-compose upした後にコンテナ内に入ってこのコマンドを実行する
#RUN npx prisma migrate dev --name init

# TypeScriptをコンパイル
RUN npm run build

# ポート番号を設定
EXPOSE 4000

# アプリケーションを起動
CMD ["npm", "start"]