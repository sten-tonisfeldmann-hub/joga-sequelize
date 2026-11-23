const express = require('express');

class ArticleRouter {
    constructor(articleController) {
        this.articleController = articleController;
        this.router = express.Router();

        this.configureRoutes();
    }

    configureRoutes() {
        this.router.get('/', this.articleController.getAllArticles);
        this.router.get('/:slug', this.articleController.getArticleBySlug);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = ArticleRouter;
