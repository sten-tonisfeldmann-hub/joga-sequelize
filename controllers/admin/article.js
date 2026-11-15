const db = require('../../models');
const { Article, Author, Tag, ArticleTags } = db;

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [
        { model: Author, as: 'author' },
        {
          model: Tag,
          as: 'tags',
          through: { model: ArticleTags, attributes: [] }
        }
      ]
    });

    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id, {
      include: [
        { model: Author, as: 'author' },
        {
          model: Tag,
          as: 'tags',
          through: { model: ArticleTags, attributes: [] }
        }
      ]
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createArticle = async (req, res) => {
  try {
    const { name, slug, image, body, published, author_id } = req.body;

    if (!name || !slug || !image || !body || !author_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const article = await Article.create({
      name,
      slug,
      image,
      body,
      published: published || new Date(),
      author_id
    });

    return res.status(201).json({ message: 'New article created', article });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const { name, slug, image, body, published, author_id } = req.body;

    await article.update({
      name: name || article.name,
      slug: slug || article.slug,
      image: image || article.image,
      body: body || article.body,
      published: published || article.published,
      author_id: author_id || article.author_id
    });

    return res.status(200).json({ message: 'Article updated', article });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.destroy();

    return res.status(200).json({ message: 'Article deleted' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
