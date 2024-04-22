const { Pool } = require("pg");

const pool = new Pool({
  user: "nodeapp2",
  password: "password",
  database: "node_and_postgres_db",
  host: "localhost",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
