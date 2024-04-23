const pool = require("../../../db/dbClient");

async function createOrder(data) {
    let client;

    const { user_id, products } = data;

    try {
        client = await pool.connect();

        await client.query("BEGIN");

        const orderResult = await client.query(
            `INSERT INTO orders (user_id) VALUES ($1) RETURNING *;`,
            [user_id]
        );

        const order_id = orderResult.rows[0].order_id;

        for (const product of products) {
            await client.query(
                `INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3);`,
                [order_id, product.product_id, product.quantity]
            );
        }

        await client.query("COMMIT");

        return order_id;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = createOrder;
