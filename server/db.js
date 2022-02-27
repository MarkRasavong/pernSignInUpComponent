import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    isProduction ? proConfig : devConfig,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export default pool;