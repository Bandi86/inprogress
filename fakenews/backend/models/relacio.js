import User from './Users.js';
import Article from './Articles.js';
import Comments from './Comments.js';
import Category from './Category.js';
import ArticleCategory from './ArticleCategory.js';


import Tag from './Tags.js';

// Kapcsolatok definiálása
User.hasMany(Comments, { foreignKey: 'userId' });
Article.hasMany(Comments, { foreignKey: 'articleId' });
Article.belongsTo(Tag, { foreignKey: 'tagId' });
Article.belongsToMany(Category, { through: ArticleCategory, foreignKey: 'articleId' });
Comments.belongsTo(User, { foreignKey: 'userId' });
Comments.belongsTo(Article, { foreignKey: 'articleId' });
Tag.hasMany(Article, { foreignKey: 'tagId' });
Category.belongsToMany(Article, { through: ArticleCategory, foreignKey: 'categoryId' });

export { User, Article, Comments, Tag, Category, ArticleCategory };
