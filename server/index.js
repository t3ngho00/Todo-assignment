require("dotenv").config();

const express = require("express");
const cors = require("cors");
const query = require("./helpers/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const getTasks = async () => {
    try {
        const res = await query("SELECT * FROM task");
        return res.rows;
    } catch (err) {
        console.error(err);
        return null;
    }
};

app.get("/", async (req, res) => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/", async (req, res) => {
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

app.listen(3001, () => {
    console.log("Server started on port 3001");
});