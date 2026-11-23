class AuthorController {
    constructor(authorService) {
        this.authorService = authorService;
    }

    getAllAuthors = async (req, res, next) => {
        try {
            const authors = await this.authorService.getAllAuthors();
            res.status(200).json(authors);
        } catch (error) {
            next(error);
        }
    };

    getAuthorById = async (req, res, next) => {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: 'Invalid author ID' });
            }

            const author = await this.authorService.getAuthorById(id);

            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }

            res.status(200).json({ author });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = AuthorController;
