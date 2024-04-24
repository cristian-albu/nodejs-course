const pool = require("../../../db/dbClient");

async function getOrder(id) {
    let client;

    try {
        client = await pool.connect();

        const result = await client.query(
            `SELECT * FROM orders WHERE order_id=$1;`,
            [id]
        );

        const order_details = await client.query(
            `SELECT * FROM order_details WHERE order_id=$1;`,
            [id]
        );

        return {
            order: result.rows[0],
            order_details: order_details.rows,
        };
    } catch (error) {
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = getOrder;
