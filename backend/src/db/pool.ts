import pg from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const { Pool } = pg;

// Creates a new PostgreSQL connection pool using environment variables for configuration
const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
});

export default pool;
