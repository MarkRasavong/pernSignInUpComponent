import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { email, password, first_name, last_name, } = req.body;
    const hashed_password = await bcrypt.hash(password, 12);
    const codigo = process.env.CODIGO_USARIO

    const results = await pool.query(`INSERT INTO users (first_name, last_name, email, password, autoritzacio) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [first_name, last_name, email, hashed_password, codigo]
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //FIND USER
    const findUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (findUser.rowCount === 0) return res.status(404).json({ message: "Email is not in users database" });

    const passwordIsCorrect = await bcrypt.compare(password, findUser.rows[0].password);
    if (!passwordIsCorrect) return res.status(400).json({ message: 'Invalid password input' });

    const token = jwt.sign({ email, password: findUser.rows[0].password }, process.env.JWT_SECRET, { expiresIn: "1hr" });
    res.status(200).json({ data: findUser.rows[0], token });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
})

export default router;