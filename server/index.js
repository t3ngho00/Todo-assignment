const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: '12345',
    port: 5432
});

const getTasks = async () => {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM task');
        return res.rows;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        client.release();
    }
};

app.get('/', async (req, res) => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/', async (req, res) => {
    const { description } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [description]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});