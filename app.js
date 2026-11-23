const express = require('express');

const ArticleRepository = require('./repositories/ArticleRepository');
const ArticleService = require('./services/ArticleService');
const ArticleController = require('./controllers/ArticleController');
const ArticleRouter = require('./routes/ArticleRouter');
const ErrorHandler = require('./middleware/errorHandler');

class Application {
    constructor(database) {
        this.database = database;
        this.app = express();

        this.configureMiddleware();
        this.configureRoutes();
    }

    configureMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    configureRoutes() {
        const articleRepository = new ArticleRepository(this.database.Article, this.database.Author);
        const articleService = new ArticleService(articleRepository);
        const articleController = new ArticleController(articleService);
        const articleRouter = new ArticleRouter(articleController);

        this.app.use('/api/articles', articleRouter.getRouter());

        this.app.get('/', (req, res) => {
            res.status(200).json({ message: 'Welcome to sequelize application' });
        });

        this.app.use((req, res) => {
            res.status(404).json({ message: 'Route not found' });
        });

        this.app.use(ErrorHandler.handle);
    }

    getApp() {
        return this.app;
    }
}

module.exports = Application;