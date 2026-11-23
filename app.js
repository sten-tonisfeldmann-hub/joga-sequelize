const express = require('express');
const cors = require('cors');

const ArticleRepository = require('./repositories/ArticleRepository');
const ArticleService = require('./services/ArticleService');
const ArticleController = require('./controllers/ArticleController');
const ArticleRouter = require('./routes/ArticleRouter');
const ArticleAdminController = require('./controllers/admin/ArticleAdminController');
const ArticleAdminRouter = require('./routes/admin/ArticleAdminRouter');
const AuthorRepository = require('./repositories/AuthorRepository');
const AuthorService = require('./services/AuthorService');
const AuthorController = require('./controllers/AuthorController');
const AuthorRouter = require('./routes/AuthorRouter');
const ErrorHandler = require('./middleware/errorHandler');

class Application {
    constructor(database) {
        this.database = database;
        this.app = express();

        this.configureMiddleware();
        this.configureRoutes();
    }

    configureMiddleware() {
        this.app.use(cors({
            methods: ['GET', 'POST', 'DELETE', 'PUT'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    configureRoutes() {
        const articleRepository = new ArticleRepository(
            this.database.Article,
            this.database.Author,
            this.database.Tag
        );
        const articleService = new ArticleService(articleRepository);

        const articleController = new ArticleController(articleService);
        const articleRouter = new ArticleRouter(articleController);

        const articleAdminController = new ArticleAdminController(articleService);
        const articleAdminRouter = new ArticleAdminRouter(articleAdminController);

        const authorRepository = new AuthorRepository(this.database.Author);
        const authorService = new AuthorService(authorRepository);
        const authorController = new AuthorController(authorService);
        const authorRouter = new AuthorRouter(authorController);

        this.app.use('/api/articles', articleRouter.getRouter());
        this.app.use('/api/authors', authorRouter.getRouter());
        this.app.use('/api/admin/article', articleAdminRouter.getRouter());

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