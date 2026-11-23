class ArticleRepository {

    constructor(ArticleModel) {
        this.ArticleModel = ArticleModel;
    }

    findAll = async () => {
        return await this.ArticleModel.findAll();
    };
}

module.exports = ArticleRepository;