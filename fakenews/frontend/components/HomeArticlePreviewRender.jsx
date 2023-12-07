'use client';

import React, { useState, useEffect } from 'react';
import { cutBody } from '@/lib/cutBody';
import { formatDateTime } from '@/lib/convertTime';
import Link from 'next/link';
import dummy from '../public/dummy-article-img.jpg';
import Image from 'next/image';
import CommentCount from './CommentCount';
import { getArticles } from '@/app/api/articles';

const HomeArticlePreviewRender = () => {
  const [articlesState, setArticlesState] = useState({
    loading: false,
    articles: [],
    error: false,
  });

  console.log(articlesState.articles);

  useEffect(() => {
    getArticles()
      .then((response) => {
        setArticlesState((prevState) => ({
          ...prevState,
          loading: false,
          articles: response,
          error: false,
        }));
      })
      .catch((error) => {
        console.error(error);
        setArticlesState((prevState) => ({
          ...prevState,
          loading: false,
          error: true,
        }));
      });
  }, []);

  return (
    <section className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {articlesState.articles.length > 0 &&
        articlesState.articles.map((article) => (
          <div key={article.articleId} className='tile col-span-full'>
            <div className='flex flex-row rounded-lg shadow-lg overflow-hidden'>
              <Image
                className='object-cover rounded-t-lg'
                src={dummy} // Add the source for the article image here
                alt={article.title}
              />
              <div className='bg-white p-6 flex flex-col px-4 py-4 gap-4 rounded-b-lg'>
                <Link href={`/articles/${article.articleId}`}>
                  <div className='mt-2 flex flex-col gap-6 items-center'>
                    <h1 className='text-6xl font-bold text-gray-900'>
                      {article.title}
                    </h1>
                    <div className='py-6'>
                      <p className='mt-3 text-base text-gray-500'>
                        {cutBody(article.body)}...
                      </p>
                    </div>
                  </div>
                </Link>
                <div className='flex flex-row justify-between gap-4'>
                  {article.tagNames.map((tag) => (
                    <p className='text-sm font-medium' key={tag}>
                      <Link href='#' className='hover:underline'>
                        #{tag}
                      </Link>
                    </p>
                  ))}
                  <div className='flex items-center space-x-1 text-sm text-gray-500'>
                    <time>
                      Letrehozva: {formatDateTime(article.publishedAt)}
                    </time>
                    <span aria-hidden='true'>&middot;</span>
                  </div>
                  <div className='flex items-center mt-4'>
                    {article.authorImage && (
                      <div className='flex-shrink-0'>
                        <img
                          className='h-10 w-10 rounded-full'
                          src={article.authorImage}
                          alt={article.author}
                        />
                      </div>
                    )}
                    <div className='gap-4'>
                      <p className='text-sm font-medium text-gray-900'>
                        <Link href={`/authors/${article.author}`}>
                          Szerzo: {article.author}
                        </Link>
                      </p>
                      <CommentCount articleId={article.articleId} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {articlesState.loading && (
        <div className='flex justify-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
        </div>
      )}
    </section>
  );
};

export default HomeArticlePreviewRender;
