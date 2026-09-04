import pg from "pg";
import dotenv from "dotenv";

// Load the appropriate environment variables
const envFile = process.env.NODE_ENV === "test"
    ? ".env.test"
    : ".env";

dotenv.config({ path: envFile });

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
