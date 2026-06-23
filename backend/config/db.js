import pgp from "pg-promise";

const username = process.env.DB_USER
const pass = process.env.DB_PASS
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const database = process.env.DB_NAME

const connectionConfig

const db = pgp(`postgres://${username}:${pass}@${host}:${port}/${database}`);

//NEEDS TO BE TESTED

export default db