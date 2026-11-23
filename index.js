require('dotenv').config();

const express = require('express');
const cors = require('cors');
const colors = require('colors');

const db = require('./models');
const LoadModels = require('./app');

const startServer = async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connected to the database'.bgGreen.bold);

        const application = new LoadModels(db);
        const app = application.getApp();

        app.use(cors({
            methods: ['GET', 'POST', 'DELETE', 'PUT'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        }));

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`.green.bold);
        });
    } catch (error) {
        console.log(error);
        console.error('Unable to start application:', error.message);
    }
};

startServer();