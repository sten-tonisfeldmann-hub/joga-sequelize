const express = require('express');

class AuthorRouter {
    constructor(authorController) {
        this.authorController = authorController;
        this.router = express.Router();

        this.configureRoutes();
    }

    configureRoutes() {
        this.router.get('/', this.authorController.getAllAuthors);
        this.router.get('/:id', this.authorController.getAuthorById);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = AuthorRouter;
