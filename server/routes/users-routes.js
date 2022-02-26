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

router.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const userDetails = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

    res.status(200).json({
      status: 'success',
      data: userDetails.rows
    });
  } catch (err) {
    console.log(err);
  }
})

export default router;