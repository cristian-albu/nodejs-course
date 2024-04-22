const pool = require("./dbClient");

const users = `--sql
    CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
    );
`;

const products = `--sql
    CREATE TABLE products(
        product_id SERIAL PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL
    );
`;

const orders = `--sql
    CREATE TABLE orders(
        order_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const order_details = `--sql
    CREATE TABLE order_details(
        order_detail_id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(order_id),
        product_id INT REFERENCES products(product_id),
        quantity INT NOT NULL,
        CONSTRAINT fk_order_product UNIQUE(order_id, product_id)
    );
`;

async function createTable(client, query) {
  try {
    const result = await client.query(query);
    return result;
  } catch (error) {
    console.error(
      `Error creating table:`,
      query.split("TABLE ")[1].split("(")[0]
    );
    throw error;
  }
}

async function buildSchema() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await Promise.all([
      createTable(client, users),
      createTable(client, products),
      createTable(client, orders),
      createTable(client, order_details),
    ]);

    await client.query("COMMIT");
    console.log("Schema built successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Schema build aborted.");
  } finally {
    client.release();
  }
}

buildSchema();
