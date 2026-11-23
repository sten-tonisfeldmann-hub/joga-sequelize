const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = async () => {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('Database connected successfully'.bgGreen.bold);
        return db;
    } catch (error) {
        console.log('Error while connecting with the database'.bgRed.bold);
        throw error;
    }
};

module.exports = connection;