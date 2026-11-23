class AuthorService {
    constructor(authorRepository) {
        this.authorRepository = authorRepository;
    }

    getAllAuthors = async () => {
        return await this.authorRepository.findAll();
    };

    getAuthorById = async (id) => {
        return await this.authorRepository.findByPk(id);
    };
}

module.exports = AuthorService;
