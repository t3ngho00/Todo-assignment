require("dotenv").config();

const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', todoRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});