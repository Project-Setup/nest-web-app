# NestJs NextJs Starter Repository

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

1.

```bash
$ nvm use || nvm install
$ yarn
```

2. change the import line in `node_modules/next/dist/build/webpack/plugins/pages-manifest-plugin.d.ts`

```ts
import { Compiler, WebpackPluginInstance as Plugin } from 'webpack';
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
$ mkdir -p src/client/pages
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

6. change the import line in `node_modules/next/dist/build/webpack/plugins/pages-manifest-plugin.d.ts` every time after npm package installation/removal

```ts
import { Compiler, WebpackPluginInstance as Plugin } from 'webpack';
```

7. create pages in `src/client/pages` folder

8. modify `tsconfig.json`

```json
{
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["src/client/.next"]
}
```

### [Eslint and Prettier](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)

1.

```bash
$ yarn add -D eslint-plugin-react eslint-import-resolver-typescript eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react-hooks
```

2. create `src/client/.eslintrc.js`

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@emotion',
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
  ],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'import/extensions': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/react-in-jsx-scope': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': [2, { custom: 'ignore' }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'prettier/prettier': 2,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
    'no-bitwise': 2,
    '@emotion/no-vanilla': 2,
    '@emotion/import-from-emotion': 2,
    '@emotion/styled-import': 2,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
```

### [Jest](https://medium.com/@miiny/unit-test-next-js-with-jest-and-enzyme-5b305a8e29fe)

1.

```bash
$ yarn remove ts-jest
$ yarn add -D @next/env @babel/core babel-jest
```

2. modify `jest` config in `package.json`

```json
{
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts", "tsx", "jsx"],
    "globals": {
      "NODE_ENV": "test"
    },
    "testRegex": ".*\\.spec\\.(t|j)sx?$",
    "transform": {
      "^.+\\.(t|j)sx?$": "babel-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)sx?"],
    "coverageDirectory": "../coverage",
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "next.config.js",
      ".json",
      ".snap"
    ],
    "testEnvironment": "node",
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/mocks.js",
      "\\.(css|less|scss)$": "<rootDir>/test/__mocks__/mocks.js",
      "^~(.*)$": "<rootDir>/src/$1"
    },
    "snapshotSerializers": ["@emotion/jest/serializer"],
    "setupFiles": ["<rootDir>/test/jest.setup.js"],
    "setupFilesAfterEnv": ["<rootDir>/test/jest.setupAfterEnv.js"]
  }
}
```

4. create `babel.config.js`

```js
module.exports = {
  presets: ['next/babel'],
};
```

5. create symbolic link of `babel.config.js` to `src/client/babel.config.js`

```bash
$ ln -sf "$(pwd)/babel.config.js" "$(pwd)/src/client"
```

6. create `test/jest.setup.js`

```js
import { join } from 'path';
import { loadEnvConfig } from '@next/env';

// to load '.env' files in test
loadEnvConfig(join(__dirname, '../src/client'));
```

### [EmotionJs](https://emotion.sh/docs/install)

1.

```bash
$ yarn add @emotion/react
$ yarn add -D @emotion/babel-plugin @emotion/eslint-plugin @emotion/jest
```

2. change `babel.config.js`

```js
module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: ['@emotion/babel-plugin'],
};
```

3.  add rules and plugins to `.eslintrc.js`

```js
module.exports = {
  // ...
  rules: {
    // ...
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/styled-import': 'error',
  },
  // ...
  plugins: [
    '@emotion',
    // ...
  ],
  // ...
};
```

4. add `test/jest.setupAfterEnv.js`

```js
import { matchers } from '@emotion/jest';

expect.extend(matchers);
```

5. add to `tsconfig.json`

```json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}
```
