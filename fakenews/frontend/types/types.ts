export type User = {
  userId: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export interface Article {
  articleId: string;
  title: string;
  body: string;
  description: string;
  image: string;
  source: string;
  url: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type Tags = {
  tagId: string,
  name: string,

}

export type FilmArticles = Article[];
