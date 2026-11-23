class ArticleAdminController {
    constructor(articleService) {
        this.articleService = articleService;
    }

    createArticle = async (req, res, next) => {
        try {
            const { name, slug, image, body, published, author_id } = req.body;

            if (!name || !slug || !image || !body || !author_id) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const article = await this.articleService.createArticle({
                name,
                slug,
                image,
                body,
                published: published || new Date(),
                author_id
            });

            res.status(201).json({ message: 'New article created', article });
        } catch (error) {
            next(error);
        }
    };

    getArticleById = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: 'Invalid article ID' });
            }

            const article = await this.articleService.getArticleById(id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }

            res.status(200).json(article);
        } catch (error) {
            next(error);
        }
    };

    updateArticle = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: 'Invalid article ID' });
            }

            const article = await this.articleService.updateArticle(id, req.body);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }

            res.status(200).json({ message: 'Article updated', article });
        } catch (error) {
            next(error);
        }
    };

    deleteArticle = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: 'Invalid article ID' });
            }

            const deleted = await this.articleService.deleteArticle(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Article not found' });
            }

            res.status(200).json({ message: 'Article deleted' });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = ArticleAdminController;
