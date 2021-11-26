# Installation

if you don't have `typescript` and `ts-node` please install globally
`
npm install ts-node -g
npm install typescript -g
`

NOTE: database is `POSTGRES`

create `.env` file in root folder and past data from `env.sample`.

create `.env.local` file in web folder and past data from `env.sample` in web folder.

Create `database` with name `blog`.

run `npm install` in project root and `web` folders respectively.

after run `db-migrate up -e localhost`. This will run migrations and add tables to database.

To start server run `npm run start:server` command

To start web: move into web directory and run `npm start`

Happy Checking :)
