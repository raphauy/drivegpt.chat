FROM raphauy/nextjs-base:latest AS build

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY tailwind.config.js .
COPY postcss.config.js .
COPY next-env.d.ts .
COPY next.config.js .
COPY .eslintrc.json .
COPY .env .

COPY /src ./src
COPY /public ./public
COPY /prisma ./prisma

RUN mkdir /app/tmp

RUN pnpm install
RUN pnpx prisma generate
RUN pnpm build

RUN rm .env

EXPOSE 3000

CMD ["pnpm", "start"]