'use client';
import { useEffect } from 'react';
import Link from 'next/link';

// Types Imports
import { NewsPostTypes } from '@/src/app/utils/types/newsPostTypes';

// Stores Imports
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useNewsPostsStore } from '@/src/app/utils/stores/newsPostsStore';

// Rendering Components Imports
import Loading from '@/src/app/components/reusable/Loading';
import IndividualNewsPost from '@/src/app/news/IndividualNewsPost';
import AddNewNewsPostButton from '@/src/app/news/(newsPostButtons)/AddNewNewsPostButton';

const NewsMain = ({ user }: { user: any }) => {
  const { language } = useLanguageStore();
  const { news, fetchNews, isLoading } = useNewsPostsStore();

  // Fetch updated news posts on render
  useEffect(() => {
    fetchNews();
  }, [news]);

  // Sort news posts by createdAt timestamp from newest to oldest
  const sortedNewsPosts = news
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <div className='flex flex-col bg-white justify-around'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-semibold md:mb-8'>
          {language === 'en' ? 'News' : 'Новости'}
        </h2>

        <Link href='/news/add-new-news-post'>
          {user && <AddNewNewsPostButton />}
        </Link>
      </div>

      <div className='flex flex-col justify-center items-start px-4 md:px-8'>
        {isLoading ? (
          <Loading message='Updating Posts...' />
        ) : (
          <div>
            {sortedNewsPosts &&
              sortedNewsPosts.map((post: NewsPostTypes) => (
                <IndividualNewsPost
                  user={user}
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  author={post.author}
                  content={post.content}
                  created_at={post.created_at}
                  newsImageUrl={post.newsImageUrl}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsMain;
