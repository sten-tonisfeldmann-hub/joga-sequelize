'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArticleTags extends Model {
    static associate(models) {
      ArticleTags.belongsTo(models.Article, {
        foreignKey: 'articleId',
        as: 'article'
      });

      ArticleTags.belongsTo(models.Tag, {
        foreignKey: 'tagId',
        as: 'tag'
      });
    }
  }

  ArticleTags.init({
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ArticleTags'
  });

  return ArticleTags;
};