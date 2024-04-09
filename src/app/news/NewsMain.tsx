'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useNewsStore } from '../utils/stores/NewsStore';
import { useEffect, useState } from 'react';
import IndividualNewsPost from '@/src/app/news/IndividualNewsPost';
import Loading from '../components/reusable/Loading';
import AddNewPostButton from './(postButtons)/AddNewPostButton';
import AddNewPost from './AddNewPost';
import ImageUpload from '../components/reusable/ImageUpload';

const NewsMain = ({ user }: { user: any }) => {
  const [newPostModal, setNewPostModal] = useState(false);
  const [addImageModal, setAddImageModal] = useState(false);
  const [deletedPostIds, setDeletedPostIds] = useState<string[]>([]);
  const { language } = useLanguageStore();
  const { news, fetchNews, isLoading } = useNewsStore();

  useEffect(() => {
    setTimeout(() => {
      fetchNews();
    }, 1000);
  }, [news]);

  // Sort news articles by createdAt timestamp from newest to oldest
  const sortedNews = news
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

        <div onClick={() => setNewPostModal(true)}>
          {user && <AddNewPostButton />}
        </div>
      </div>

      <div className='flex flex-col justify-center items-start px-4 md:px-8'>
        {isLoading ? (
          <Loading message='Updating Posts...' />
        ) : (
          <div>
            {sortedNews &&
              sortedNews.map((post) => (
                <IndividualNewsPost
                  key={post.id}
                  id={post.id}
                  created_at={post.created_at}
                  title={post.title}
                  author={post.author}
                  content={post.content}
                  imageUrl={post.imageUrl}
                  setDeletedPostIds={setDeletedPostIds}
                  user={user}
                />
              ))}
          </div>
        )}
      </div>
      {newPostModal && (
        <AddNewPost
          setNewPostModal={setNewPostModal}
          user={user}
        />
      )}
    </div>
  );
};

export default NewsMain;
