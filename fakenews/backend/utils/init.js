import Article from "../models/Articles.js";
import Tag from "../models/Tags.js";

const initializeModels = () => {
    Article.belongsToMany(Tag, { through: 'articleTag' });
    Tag.belongsToMany(Article, { through: 'articleTag' });
  };

  initializeModels();

export { Article, Tag };