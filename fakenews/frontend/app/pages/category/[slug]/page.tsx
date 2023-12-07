'use client'
import { useRouter } from 'next/router';
import { useState } from 'react';
import ArticleRender from '@/components/ArticleRender';
import { getArticleByCategory } from '../../../api/articles';
import { Article } from '@/types/types';
import axios from 'axios';
import { baseUrl } from '@/lib/utils';

interface CategoryPageProps {
  articles: Article[];
}

interface Category {
  slug: string;
  // Egyéb szükséges mezők a kategória típusának leírásához
}

export default function CategoryPage({ articles }: CategoryPageProps) {
  const router = useRouter();
  const { category } = router.query as { category: string }; // A típuskényszerítés itt történik

  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : articles ? (
        <ArticleRender articles={articles} />
      ) : (
        <p>Nincs ilyen cikk.</p>
      )}
    </div>
  );
}

export async function getStaticPaths() {
    const response = await axios.get<Category[]>(`${baseUrl}/categories`); // Itt megadjuk a Category típust a várt adatokhoz
  
    const categories = response.data;
  
    const paths = categories.map((category) => ({
      params: { category: category.slug },
    }));
  
    return { paths, fallback: false };
  }
  
  export async function getStaticProps({ params }: any) {
    const { category } = params;
  
    // Cikkek lekérése a kategóriához
    const articles = await getArticleByCategory(category);
  
    return {
      props: {
        articles,
      },
    };
  }