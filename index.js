const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const articleRouter = require('./routes/article');
const adminArticleRouter = require('./routes/admin/article');

app.use('/articles', articleRouter);
app.use('/admin/articles', adminArticleRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});