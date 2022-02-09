import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    console.log(req.body.data);
    const { email, password, first_name, last_name, } = req.body.data;
    const hashed_password = await bcrypt.hash(password, 12);

    const results = await pool.query(`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      [first_name, last_name, email, hashed_password]
    );

    res.status(200).json({
      status: "success",
      data: results.rows[0]
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;