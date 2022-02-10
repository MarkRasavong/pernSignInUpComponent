import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { email, password, first_name, last_name, } = req.body;
    const hashed_password = await bcrypt.hash(password, 12);

    const results = await pool.query(`INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      [first_name, last_name, email, hashed_password]
    );
    const data = results.rows[0];

    const queriedUserId = await pool.query(`SELECT user_id FROM users WHERE email = $1`, [email]);
    let userId = queriedUserId.rows[0].user_id;

    const token = jwt.sign({ email: email, id: userId }, process.env.JWT_SECRET, { expiresIn: '1hr' });

    res.status(200).json({ data, token });
  } catch (error) {
    res.status(500).json({ message: "Server: User Creation Error" })
    console.log(error);
  }
});

export default router;