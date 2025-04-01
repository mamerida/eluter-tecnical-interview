FROM node:20.11-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM node:20.11-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
