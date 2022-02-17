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

export default router;