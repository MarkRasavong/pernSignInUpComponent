const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//MIDDLEWARE
app.use(cors());
app.use(express.json());

const PORT = 5000 || process.env.PORT;

app.listen(PORT, function () {
  console.log(`Server connected @ ${PORT}`);
});

app.post("/create-user", async (req, res) => {
  try {
    console.log(req.body.data);
    const { email, password, first_name, last_name, } = req.body.data;
    const results = await pool.query(`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      [first_name, last_name, email, password]
    );

    res.status(200).json({
      status: "success",
      data: results.rows[0]
    });
  } catch (error) {
    console.log(error);
  }
});