const express = require('express');

class ArticleAdminRouter {
    constructor(articleAdminController) {
        this.articleAdminController = articleAdminController;
        this.router = express.Router();
        this.configureRoutes();
    }

    configureRoutes() {
        this.router.post('/create', this.articleAdminController.createArticle);
        this.router.post('/', this.articleAdminController.createArticle);
        this.router.get('/edit/:id', this.articleAdminController.getArticleById);
        this.router.get('/:id', this.articleAdminController.getArticleById);
        this.router.post('/edit/:id', this.articleAdminController.updateArticle);
        this.router.put('/:id', this.articleAdminController.updateArticle);
        this.router.post('/delete/:id', this.articleAdminController.deleteArticle);
        this.router.delete('/:id', this.articleAdminController.deleteArticle);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = ArticleAdminRouter;
