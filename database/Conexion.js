import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export { pool };
