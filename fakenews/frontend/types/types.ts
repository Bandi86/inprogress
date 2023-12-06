export type User = {
  userId: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type Article = {
  articleId: string;
  title: string;
  body: string;
  description: string;
  image: string;
  source: string;
  tagNames: Array<string>;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type Tags = {
  tagId: string,
  name: string,

}


