'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useNewsStore } from '../utils/stores/NewsStore';
import { useEffect } from 'react';
import IndividualNewsPost from '@/src/app/news/IndividualNewsPost';
import Loading from '../components/reusable/Loading';

const News = () => {
  const { language } = useLanguageStore();
  const { news, fetchNews, isLoading } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, []);

  // console.log(news);

  return (
    <div className='flex flex-col bg-white justify-around'>
      <h2 className='text-3xl font-semibold mb-8'>
        {language === 'en' ? 'News' : 'Новости'}
      </h2>
      <div className='flex flex-col justify-center items-center'>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {news &&
              news.map((post) => (
                <IndividualNewsPost
                  key={post.id}
                  id={post.id}
                  createdAt={post.created_at}
                  title={post.title}
                  author={post.author}
                  content={post.content}
                  imageUrl={post.imageUrl}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
