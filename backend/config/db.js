import pgPromise from "pg-promise";

const pgp = pgPromise({});

const username = process.env.DB_USER
const pass = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT || 7676
const database = process.env.DB_NAME

const config = {
  host: host,
  port: port,
  database: database,
  user: username,
  password: pass,
}

const db = pgp(config);

//NEEDS TO BE TESTED

export default db