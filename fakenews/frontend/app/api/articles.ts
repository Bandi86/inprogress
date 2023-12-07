import axios from 'axios';
import { baseUrl } from '@/lib/utils';

export const getArticleById = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${baseUrl}/articles/${id}`);
    const article = response.data.articles;
    return article;
  } catch (error) {
    throw new Error(`Hiba történt a cikk lekérésekor: ${error}`);
  }
};

export const getArticleByCategory = async (categoryName: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/articles/category/${categoryName}`
    );

    const articles = response.data.articles;
    return articles;
  } catch (error) {
    throw new Error(`Hiba történt a cikk lekérésekor: ${error}`);
  }
};

// last 10 articles
export const getArticles = async () => {
  try {
    const response = await axios.get(`${baseUrl}/articles`);

    const articles = response.data.articles;
    if (articles.length === 0) {
      throw new Error('Nincs cikk az adatbázisban');
    } else {
      return articles.slice(-10);
    }
  } catch (error) {
    throw new Error(`Hiba történt a cikk lekérésekor: ${error}`);
  }
};
