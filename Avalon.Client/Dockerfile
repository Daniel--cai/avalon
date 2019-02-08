# FROM node:11.1.0-alpine as base
# WORKDIR /usr/app
# COPY package.json package.json
# COPY yarn.lock yarn.lock
# RUN yarn install

# FROM base as build
# WORKDIR /usr/app
# COPY --from=deps /usr/app/node_modules /usr/app/node_modules
# COPY . /usr/app
# RUN yarn build

# FROM scratch as ui
# COPY --from=build /usr/app/dist /usr/app

FROM node:11.1.0-alpine AS node_base

FROM node_base as deps
WORKDIR /usr/app
COPY package.json /usr/app/package.json
COPY yarn.lock /usr/app/yarn.lock
RUN yarn install

FROM node_base as dev
WORKDIR /usr/app
COPY --from=deps /usr/app/node_modules /usr/app/node_modules
COPY . /usr/app
ENTRYPOINT yarn start --env.host 0.0.0.0 --env.port 3000

# FROM socialengine/nginx-spa
# COPY --from=dev /usr/app /app