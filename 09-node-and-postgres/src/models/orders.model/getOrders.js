const pool = require("../../../db/dbClient");

async function getOrders() {
    let client;

    try {
        client = await pool.connect();

        const results = await client.query(`SELECT * FROM orders;`);

        return results.rows;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

module.exports = getOrders;
