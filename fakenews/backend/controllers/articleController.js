import Tag from '../models/Tags.js';
//import { getNumberOfLikesForArticle } from '../utils/like.js';
import { Article, User, Category } from '../models/relacio.js';

// ALL ARTICLE
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json({ articles, length: articles.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ALL ARTICLES BY USER
export const getArticlesByUser = async (req, res) => {
  const { name } = req.params;

  try {
    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    const articles = await Article.findAll({
      where: { userId: user.userId },
    });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE ARTICLE
export const createArticle = async (req, res) => {
  const { title, body, description, image, userId, tags, category } = req.body;
  console.log(req.body);
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const author = user.name;

    // Kategória keresése a név alapján
    const foundCategory = await Category.findOne({ where: { name: category } });
    console.log(foundCategory);
    if (!foundCategory) {
      return res.status(404).json({ message: 'Category not found!' });
    }

    // Cikk létrehozása és hozzárendelése a kategóriához
    const newArticle = await Article.create({
      title,
      body,
      description,
      image,
      author,
      userId,
      tagNames: tags,
    });

    // Hozzárendeljük az új cikket a megtalált kategóriához
    await newArticle.addCategory(foundCategory);

    // Címkék hozzáadása az új cikkhez - itt a megfelelő logikát kell alkalmazni

    res.status(201).json({
      message: 'Cikk sikeresen feltöltve',
      newArticle,
    });
  } catch (error) {
    console.error('Validation Error:', error);
    res
      .status(500)
      .json({ message: 'Validation error occurred', error: error.message });
  }
};

// ARTICLE BY TAGS
export const getArticleByTags = async (req, res) => {
  const { tagName } = req.params;

  try {
    const tag = await Tag.findOne({ where: { name: tagName } });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not exists' });
    }

    const articles = await tag.getArticles(); // Keresés a cikkek között az adott címkével

    res.status(200).json({ articles, length: articles.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ARTICLE BY ID
export const getArticleById = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findOne({ where: { articleId } });
    if (!article) {
      return res.status(404).json({ message: 'No article with this id' });
    }

    //const numberOfLikes = await getNumberOfLikesForArticle(articleId);

    res.status(200).json({ article /* numberOfLikes */ });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ARTICLE BY CATEGORY
export const getArticleByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const category = await Category.findOne({ where: { name: categoryName } });

    if (!category) {
      return res.status(404).json({ message: 'Category not exists' });
    }

    const articles = await category.getArticles();

    res.status(200).json({ articles, length: articles.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDIT ARTICLE
export const editArticle = async (req, res) => {
  const { title, body, description, image, source, url } = req.body;

  try {
    const { articleId } = req.params;

    const article = await Article.findOne({ where: { articleId } });

    if (!article) {
      return res.status(404).json({ message: 'No article with this id' });
    }

    // Frissítendő adatok beállítása, ha azok érkeztek a kérésben
    article.title = title || article.title;
    article.body = body || article.body;
    article.description = description || article.description;
    article.image = image || article.image;
    article.source = source || article.source;
    article.url = url || article.url;

    // Módosított adatok mentése
    const updatedArticle = await article.save();

    return res
      .status(200)
      .json({ message: 'Article updated successfully', updatedArticle });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE ARTICLE
export const deleteArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findOne({ where: { articleId } });
    if (!article) {
      return res.status(404).json({ message: 'No article with this id' });
    } else {
      await Article.destroy({ where: { articleId } });
      res.status(200).json({ message: 'Article deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
