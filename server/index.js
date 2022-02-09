import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users-routes.js';

const app = express();

//MIDDLEWARE
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = 5000 || process.env.PORT;

//ROUTES
app.use('/api/users', usersRouter);

app.listen(PORT, function () {
  console.log(`Server connected @ ${PORT}`);
});