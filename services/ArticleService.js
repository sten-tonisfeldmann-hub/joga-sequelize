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
}

module.exports = ArticleService;