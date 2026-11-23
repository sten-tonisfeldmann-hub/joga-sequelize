class ArticleRepository {

    constructor(ArticleModel) {
        this.ArticleModel = ArticleModel;
    }

    findAll = async () => {
        return await this.ArticleModel.findAll();
    };

    findBySlug = async (slug) => {
        return await this.ArticleModel.findOne({
            where: { slug }
        });
    };
}

module.exports = ArticleRepository;