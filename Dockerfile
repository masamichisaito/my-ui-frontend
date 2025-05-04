FROM node:20

WORKDIR /app

# 依存関係だけ先にコピーしてインストール（キャッシュ活用）
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 残りのファイルコピー
COPY . .

# ビルド実行（任意）
# RUN yarn build

CMD ["yarn", "dev"]
