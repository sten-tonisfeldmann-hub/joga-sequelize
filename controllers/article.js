const Sequelize = require('sequelize'); 
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize');

const Article = require('../models/article')(sequelize, Sequelize.DataTypes);
const Author = require('../models/author')(sequelize, Sequelize.DataTypes);

Article.belongsTo(Author, { foreignKey: 'author_id', as: 'author' });

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            include: [{
                model: Author,
                as: 'author'
            }]
        });

        return res.status(200).json(articles);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getAllArticleBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const article = await Article.findOne({
            where: { slug },
            include: [{
                model: Author,
                as: 'author'
            }]
        });

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        return res.status(200).json(article);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    getAllArticles,
    getAllArticleBySlug
};