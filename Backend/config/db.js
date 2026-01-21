const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

// MySQL Connection Pool
const mysqlPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'solar_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test MySQL Connection
mysqlPool.getConnection()
    .then(connection => {
        console.log('MySQL Connected');
        connection.release();
    })
    .catch(err => {
        console.error('MySQL Connection Error:', err);
    });

module.exports = { connectDB, mysqlPool };
