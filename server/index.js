import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth-routes.js';
import userRoutes from './routes/users-routes.js';

const app = express();

//MIDDLEWARE
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = 5000 || process.env.PORT;

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.get("*", (req, res) => {
  res.json({ message: "Please redirect to the appropriate route." })
})

app.listen(PORT, function () {
  console.log(`Server connected @ ${PORT}`);
});