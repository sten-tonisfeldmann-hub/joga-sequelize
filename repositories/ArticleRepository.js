class ArticleRepository {

    constructor(ArticleModel, AuthorModel, TagModel) {
        this.ArticleModel = ArticleModel;
        this.AuthorModel = AuthorModel;
        this.TagModel = TagModel;
    }

    findAll = async () => {
        return await this.ArticleModel.findAll({
            include: [
                { model: this.AuthorModel, as: 'author' },
                { model: this.TagModel, as: 'tags', through: { attributes: [] } }
            ]
        });
    };

    findBySlug = async (slug) => {
        return await this.ArticleModel.findOne({
            where: { slug },
            include: [
                { model: this.AuthorModel, as: 'author' },
                { model: this.TagModel, as: 'tags', through: { attributes: [] } }
            ]
        });
    };

    findById = async (id) => {
        return await this.ArticleModel.findByPk(id);
    };

    create = async (data) => {
        return await this.ArticleModel.create(data);
    };

    update = async (article, data) => {
        return await article.update(data);
    };

    delete = async (article) => {
        return await article.destroy();
    };
}

module.exports = ArticleRepository;