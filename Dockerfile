FROM node:20

RUN npm install -g yarn@1.22.21 --force

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --check-files

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]
