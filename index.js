require('dotenv').config();

const colors = require('colors');
const db = require('./models');
const LoadModels = require('./app');

const startServer = async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connected to the database'.bgGreen.bold);

        const application = new LoadModels(db);
        const app = application.getApp();
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`.green.bold);
        });
    } catch (error) {
        console.error('Unable to start application:', error.message);
    }
};

startServer();