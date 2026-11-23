class ArticleService {

    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }

    getAllArticles = async () => {
        return await this.articleRepository.findAll();
    };

    getArticleBySlug = async (slug) => {
        return await this.articleRepository.findBySlug(slug);
    };

    getArticleById = async (id) => {
        return await this.articleRepository.findById(id);
    };

    createArticle = async (data) => {
        return await this.articleRepository.create(data);
    };

    updateArticle = async (id, data) => {
        const article = await this.articleRepository.findById(id);
        if (!article) return null;

        return await this.articleRepository.update(article, data);
    };

    deleteArticle = async (id) => {
        const article = await this.articleRepository.findById(id);
        if (!article) return false;

        await this.articleRepository.delete(article);
        return true;
    };
}

module.exports = ArticleService;