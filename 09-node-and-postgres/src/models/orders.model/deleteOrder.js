const pool = require("../../../db/dbClient");

async function deleteOrder(id) {
    let client;

    try {
        client = await pool.connect();

        await client.query(`DELETE FROM orders WHERE order_id=$1;`, [id]);

        return { message: `Item with id: ${id} deleted successfuly` };
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = deleteOrder;
