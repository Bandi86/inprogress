'use client';

import Navbar from '@/components/Navbar';
import HomeArticlePreviewRender from '@/components/HomeArticlePreviewRender';

export default function Home() {
  return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
        <div className='text-center'>
          <HomeArticlePreviewRender />
        </div>
      </div>
    </div>
  );
}
