const express = require('express');
const router = express.Router();
const query = require("../helpers/db");

const getTasks = async () => {
    try {
        const res = await query("SELECT * FROM task");
        return res.rows;
    } catch (err) {
        console.error(err);
        return null;
    }
};

router.get("/", async (req, res) => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    const { description } = req.body;
    try {
        const result = await query(
            "INSERT INTO task (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await query('DELETE FROM task WHERE id = $1', [id]);
        res.status(200).send(`Task deleted with ID: ${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;