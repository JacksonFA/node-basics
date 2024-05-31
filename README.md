# NodeJS Basics to Advanced

## Ignite Node.js 2023 - Module 01 (Fundamentals, Node HTTP and Streams)

### Running the project

After clone the repo, inside of 01-fundamentals-http-streams and with node v20.10 run:

- `npm install`
- `npm run dev`

To import a csv file:

- Edit file: `src/csv/tasks.csv`
- Run: `npm run import:csv`

The available endpoints are in: `src/client.http`

## Ignite Node.js 2023 - Module 02 (API Rest, Fastify and Knex)

### Running the project

After clone the repo, inside of 02-rest-fastify-knex and with node v20.10 run:

- `yarn`
- setup .env and .env.test files like examples
- `yarn knex migrate:latest`
- `yarn dev`
- to e2e tests: `yarn test`

The available endpoints are in: `src/client.http`

## Ignite Node.js 2023 - Module 03 (Solid, Design Patterns and JWT)

### Running the project

After clone the repo, inside of 03-solid-patterns-jwt and with node v18.10 run:

- to install dependencies: `npm install`
- setup .env file like example
- to run postgreSQL: `docker compose up -d`
- to run: `npm run dev`
- to build: `npm run build`
- to unit tests: `npm run test` or `npm run test:watch`
- to e2e tests:
  - `npm run test:create-prisma-environment`
  - `npm run test:install-prisma-environment`
  - `npm run test:e2e` or `npm run test:e2e:watch`

Some available endpoints are in `insomnia.json` to import for insomnia

## Ignite Node.js 2023 - Module 04 (DDD, Clean Arch and TDD)

### Running the project

After clone the repo, inside of 04-ddd-clean_arch and with node v18.10 run:

- to install dependencies: `npm install`
- to unit tests: `npm run test` or `npm run test:watch`

## Ignite Node.js 2023 - Module 05 (NestJS, Prisma and Clean Arch)

### Running the project

After clone the repo, inside of 05-nest-prisma-clean_arch and with node v18.10 run:

- to install dependencies: `npm install`
- setup .env file like example
- to run postgreSQL and Redis: `docker compose up -d`
- to run: `npm run dev`
- to build: `npm run build`
- to unit tests: `npm run test` or `npm run test:watch`
- to e2e tests:
  - `npm run test:create-prisma-environment`
  - `npm run test:install-prisma-environment`
  - `npm run test:e2e` or `npm run test:e2e:watch`

The available endpoints are in: `src/client.http`
