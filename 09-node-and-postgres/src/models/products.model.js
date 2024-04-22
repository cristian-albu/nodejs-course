const pool = require("../../db/dbClient");

async function getProducts() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(`SELECT * FROM products;`);
    return result.rows; // Return only the data
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function getProduct(param) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM products WHERE product_id=$1;`,
      [param]
    );
    return result.rows; // Return only the data
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function createProduct(item) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `INSERT INTO products (product_name, price) VALUES ($1, $2) RETURNING *`,
      [item.product_name, item.price]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function deleteProduct(param) {
  let client;
  try {
    client = await pool.connect();
    await client.query(`DELETE FROM products WHERE product_id=$1`, [param]);
    return { message: "Item deleted" };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
};
