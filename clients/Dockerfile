FROM node:14 AS base

# Upgrade npm for workspaces support (v7+)
RUN npm install -g npm

# Expo CLI for React Native
RUN npm install -g expo-cli

RUN mkdir /app
WORKDIR /app

# Dependencies
COPY package.json .
COPY yarn.lock .

## web
COPY web/package.json web/package.json

## native
COPY native/package.json native/package.json

## shared
COPY shared/package.json shared/package.json

## api - run required install steps for transpile
COPY api/ api/
WORKDIR /app/api
RUN npm install
RUN npm run build
WORKDIR /app

## install
RUN yarn install --frozen-lockfile

# OpenAPI Spec
COPY v1-schema.yaml .

###
# Everything from here down should be mounted
# in docker-compose.yml for development
###

# client root files
COPY entrypoint.sh .
COPY tsconfig.json .
COPY .prettierrc.json .

# web files
# include in docker-compose web volumes for dev
COPY web/README.md web/README.md
COPY web/public web/public
COPY web/pages web/pages
COPY web/components web/components
COPY web/styles web/styles
COPY web/next-env.d.ts web/next-env.d.ts
COPY web/next.config.js web/next.config.js
## TODO: Use clients/tsconfig.json or use "extends"
COPY web/tsconfig.json web/tsconfig.json


# native files
# include in docker-compose native volumes for dev
COPY native/App.tsx native/App.tsx
COPY native/app.json native/app.json
COPY native/babel.config.js native/babel.config.js 
COPY native/metro.config.js native/metro.config.js
COPY native/hooks native/hooks
COPY native/components native/components
COPY native/navigation native/navigation
COPY native/assets native/assets
COPY native/constants native/constants
COPY native/screens native/screens
COPY native/types.tsx native/types.tsx
## TODO: Use clients/tsconfig.json or use "extends"
COPY native/tsconfig.json native/tsconfig.json

# shared files
COPY shared/ shared/

# See entrypoint.sh for required environment variables
ENTRYPOINT [ "/app/entrypoint.sh" ]

ENV CMD dev

FROM base as web_base

RUN rm shared/env.ts
RUN touch shared/env.ts
# UPWARDLI_API_HOST isn't used on the client-side
RUN echo \
    "export const UPWARDLI_API_HOST = \"empty\";" \
    >> shared/env.ts
RUN echo \
    "export const UPWARDLI_RUNTIME_CONTEXT = \"${UPWARDLI_RUNTIME_CONTEXT}\";" \
    >> shared/env.ts


FROM web_base AS web_prod_full

RUN echo \
    "export const UPWARDLI_WEB_CONTEXT = \"full\";" \
    >> shared/env.ts
RUN yarn workspace @upwardli/web run build

FROM web_base as web_prod_embedded

RUN echo \
    "export const UPWARDLI_WEB_CONTEXT = \"embedded\";" \
    >> shared/env.ts
RUN yarn workspace @upwardli/web run build