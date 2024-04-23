const pool = require("../../db/dbClient");

async function getUsers() {
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(`SELECT * FROM users;`);

        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}
async function getUser(id) {
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM users WHERE user_id=$1;`,
            [id]
        );

        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}
async function createUser(data) {
    let client;

    const { username, email } = data;
    try {
        client = await pool.connect();
        const result = await client.query(
            `INSERT INTO users(username, email) VALUES($1, $2) RETURNING *;`,
            [username, email]
        );

        return result.rows[0];
    } catch (error) {
        console.log(error);
        return { error: true, errorDetails: error };
    } finally {
        if (client) {
            client.release();
        }
    }
}
async function deleteUser(id) {
    let client;

    try {
        client = await pool.connect();
        await client.query(`DELETE FROM users WHERE user_id=$1;`, [id]);
        return { message: `User with id: ${id} deleted successfully` };
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
};
