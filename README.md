# NestJs NextJs Starter Repository

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ nvm use || nvm install
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Setup

1.

```bash
$ nvm use node
```

### [NestJs and Fastify](https://docs.nestjs.com/techniques/performance)

1.

```bash
$ npm i -g @nestjs/cli
$ nest new myapp
$ cd myapp
$ yarn add @nestjs/platform-fastify
```

2. rearrange the folder structure like [this blog](https://medium.com/javascript-in-plain-english/render-next-js-with-nestjs-did-i-just-made-next-js-better-aa294d8d2c67)

3. change `src/server/main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  await app.listen(3000);
}
bootstrap();
```

### [NextJs](https://medium.com/javascript-in-plain-english/render-next-js-with-nestjs-did-i-just-made-next-js-better-aa294d8d2c67)

1.

```bash
$ yarn add next react react-dom
$ yarn add -D @types/react-dom @types/react
$ mkdir src/client
```

2. add to `tsconfig.json`

```json
{
  "compilerOptions": {
    "jsx": "preserve"
  },
  "include": ["src/**/*.ts"]
}
```

3. add `viewModule` similar to this starter repo `src/server/modules/view/*.ts`

4. import `viewModule` in `src/server/app.module.ts`

5. add to `package.json`

```json
{
  "resolutions": {
    "webpack": "^5.4.0"
  }
}
```

6. change the import line in `node_modules/next/dist/build/webpack/plugins/pages-manifest-plugin.d.ts`

```ts
import { Compiler, WebpackPluginInstance as Plugin } from 'webpack';
```
