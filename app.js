const express = require('express');

const ArticleRepository = require('./repositories/ArticleRepository');
const ArticleService = require('./services/ArticleService');
const ArticleController = require('./controllers/ArticleController');
const ArticleRouter = require('./routes/ArticleRouter');

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
        const articleRepository = new ArticleRepository(this.database.Article);
        const articleService = new ArticleService(articleRepository);
        const articleController = new ArticleController(articleService);
        const articleRouter = new ArticleRouter(articleController);

        this.app.use('/api/articles', articleRouter.getRouter());

        this.app.get('/', (req, res) => {
            res.status(200).json({ message: 'Welcome to sequelize application' });
        });

        this.app.use((error, req, res, next) => {
            res.status(500).json({ message: error.message });
        });
    }

    getApp() {
        return this.app;
    }
}

module.exports = Application;