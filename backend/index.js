const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "recipe_db",
  password: "P0wern3t!",
  port: 5432,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/recipes", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM recipes");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
