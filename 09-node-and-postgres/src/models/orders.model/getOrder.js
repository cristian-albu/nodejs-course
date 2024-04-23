const pool = require("../../../db/dbClient");

async function getOrder(id) {
    let client;

    try {
        client = await pool.connect();

        const result = await client.query(
            `SELECT * FROM orders WHERE order_id=$1;`,
            [id]
        );

        return result.rows[0];
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = getOrder;
