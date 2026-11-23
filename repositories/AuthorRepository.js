class AuthorRepository {
    constructor(AuthorModel) {
        this.AuthorModel = AuthorModel;
    }

    findAll = async () => {
        return await this.AuthorModel.findAll();
    };

    findByPk = async (id) => {
        return await this.AuthorModel.findByPk(id, {
            include: [{
                association: 'articles',
                attributes: ['id', 'name']
            }]
        });
    };
}

module.exports = AuthorRepository;
