class ArticleRepository {

    constructor(ArticleModel, AuthorModel) {
        this.ArticleModel = ArticleModel;
        this.AuthorModel = AuthorModel;
    }

    findAll = async () => {
        return await this.ArticleModel.findAll({
            include: [{
                model: this.AuthorModel,
                as: 'author'
            }]
        });
    };

    findBySlug = async (slug) => {
        return await this.ArticleModel.findOne({
            where: { slug },
            include: [{
                model: this.AuthorModel,
                as: 'author'
            }]
        });
    };
}

module.exports = ArticleRepository;