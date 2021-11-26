import { Pool, ClientConfig } from 'pg'
require('dotenv').config();

let pool = null as any

export default () => {

    const { PG_HOST, PG_USER, PG_PASSWORD, PG_PORT = 5432, PG_DB } = process.env
    console.log("HOST", PG_HOST)
    if (pool) return pool

    if (!PG_HOST) return false

    const DB_CONFIGS = {
        host: PG_HOST,
        port: PG_PORT,
        user: PG_USER,
        password: PG_PASSWORD,
        database: PG_DB
    }

    pool = new Pool(DB_CONFIGS as ClientConfig)
    return pool
}
