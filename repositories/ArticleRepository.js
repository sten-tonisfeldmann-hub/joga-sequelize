class ArticleRepository {

    constructor(ArticleModel, AuthorModel, TagModel) {
        this.ArticleModel = ArticleModel;
        this.AuthorModel = AuthorModel;
        this.TagModel = TagModel;
    }

    findAll = async () => {
        return await this.ArticleModel.findAll({
            include: [
                {
                    model: this.AuthorModel,
                    as: 'author'
                },
                {
                    model: this.TagModel,
                    as: 'tags',
                    through: { attributes: [] }
                }
            ]
        });
    };

    findBySlug = async (slug) => {
        return await this.ArticleModel.findOne({
            where: { slug },
            include: [
                {
                    model: this.AuthorModel,
                    as: 'author'
                },
                {
                    model: this.TagModel,
                    as: 'tags',
                    through: { attributes: [] }
                }
            ]
        });
    };
}

module.exports = ArticleRepository;