const {
    deleteUser,
    getUsers,
    getUser,
    createUser,
} = require("../../models/users.model");

async function httpGetUsers(_req, res) {
    try {
        const results = await getUsers();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({
            message: "An unexpected error has occured",
        });
    }
}

async function httpGetUser(req, res) {
    const user_id = Number(req.params.id);

    if (!user_id || isNaN(user_id)) {
        return res.status(400).json({
            message: "Invalid request params",
        });
    }
    try {
        const result = await getUser(user_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: "An unexpected error has occured",
        });
    }
}

async function httpCreateUser(req, res) {
    const user_data = req.body;

    const { username, email } = user_data;

    if (
        typeof username !== "string" ||
        typeof email !== "string" ||
        username.length > 100 ||
        email.length > 255 ||
        Object.keys(user_data).length > 2
    ) {
        return res.status(400).json({
            message: "Invalid request params",
        });
    }

    const data = {
        username,
        email,
    };
    try {
        const result = await createUser(data);

        if (result.error) {
            return res.status(400).json({
                message: result.errorDetails.detail,
            });
        }

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({
            message: "An unexpected error has occured",
        });
    }
}

async function httpDeleteUser(req, res) {
    const user_id = Number(req.params.id);

    if (!user_id || isNaN(user_id)) {
        return res.status(400).json({
            message: "Invalid request params",
        });
    }
    try {
        const result = await deleteUser(user_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: "An unexpected error has occured",
        });
    }
}

module.exports = {
    httpGetUsers,
    httpGetUser,
    httpCreateUser,
    httpDeleteUser,
};
