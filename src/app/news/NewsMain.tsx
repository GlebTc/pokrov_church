'use client';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useNewsStore } from '../utils/stores/NewsStore';
import { useEffect, useState } from 'react';
import IndividualNewsPost from '@/src/app/news/IndividualNewsPost';
import Loading from '../components/reusable/Loading';
import AddNewPostButton from './AddNewPostButton';
import AddNewPost from './AddNewPost';

const NewsMain = ({ user }: { user: any }) => {
  const [newPostModal, setNewPostModal] = useState(false);
  const [deletedPostIds, setDeletedPostIds] = useState<string[]>([]);
  const { language } = useLanguageStore();
  const { news, fetchNews, isLoading, deletePost } = useNewsStore();

  useEffect(() => {
    setTimeout(() => {
      fetchNews();
    }, 1000);
  }, [newPostModal || deletedPostIds]);

    // Sort news articles by createdAt timestamp from newest to oldest
    const sortedNews = news.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className='flex flex-col bg-white justify-around'>
      <div className='flex justify-between px-8'>
        <h2 className='text-3xl font-semibold mb-8'>
          {language === 'en' ? 'News' : 'Новости'}
        </h2>
        <div onClick={() => setNewPostModal(true)}>
          {user && <AddNewPostButton />}
        </div>
      </div>

      <div className='flex flex-col justify-center items-start px-12 md:px-8'>
        {isLoading ? (
          <Loading message="Updating Posts..."/>
        ) : (
          <div>
            {sortedNews &&
              sortedNews.map((post) => (
                <IndividualNewsPost
                  key={post.id}
                  id={post.id}
                  createdAt={post.created_at}
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
      {newPostModal && <AddNewPost setNewPostModal={setNewPostModal} />}
    </div>
  );
};

export default NewsMain;
