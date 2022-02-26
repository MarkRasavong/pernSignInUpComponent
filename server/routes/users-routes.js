import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const dati = await pool.query(`SELECT * FROM users`);

    res.status(200).json({
      status: 'success',
      results: dati.rows.length,
      data: dati.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Server: User Creation Error" })
    console.log(error);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.status(200).json({
      status: "success",
      data: results.rows[0]
    })
    console.log(res.data);
  } catch (err) {
    console.error(err.message);
  }
});


router.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, autoritzacio } = req.body;
    const results = await pool.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, autoritzacio= $4 WHERE id = $5',
      [first_name, last_name, email, autoritzacio, id]
    );

    res.status(200).json({
      status: 'success',
      data: results.rows[0],
    })
  } catch (err) {
    console.log(err);
  }
})

export default router;