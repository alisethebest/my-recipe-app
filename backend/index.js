require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

app.get("/recipes", async (req, res) => {
  const recipes = await client.query("SELECT * FROM recipes");
  res.json(recipes.rows);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
