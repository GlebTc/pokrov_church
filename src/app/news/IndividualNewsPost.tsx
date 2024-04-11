'use client';
import Image from 'next/image';
import { useNewsStore } from '../utils/stores/NewsStore';
import DeletePostButton from './(postButtons)/DeletePostButton';
import EditPostButton from './(postButtons)/EditPostButton';
import { useState } from 'react';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import EditPost from './EditPost';
import { NewsType } from '../utils/types/newsTypes';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const IndividualNewsPost: React.FC<any | NewsType> = ({
  user,
  id,
  created_at,
  title,
  author,
  content,
  imageUrl,
  setDeletedPostIds,
}) => {
  const { deletePost } = useNewsStore();
  const [readMore, setReadMore] = useState<boolean>(false);
  const { language } = useLanguageStore();
  const [editPostModal, setEditPostModal] = useState(false);
  const supabase = createClientComponentClient();

  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear().toString();
    return `${month} ${day}, ${year}`;
  };

  const handleDelete = async () => {
    setDeletedPostIds((prevIds: any) => [...prevIds, id]);
    const { data, error } = await supabase.storage
      .from('news_post_images')
      .remove([imageUrl.split('/').pop()]);

    deletePost(id);
  };

  const handleEdit = () => {
    setEditPostModal(true);
  };

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  return (
    <div className='INDIVIDUAL_NEWS_POST_CONTAINER max-w-4xl mx-auto my-8'>
      {imageUrl && (
        <div className='w-[200px] '>
          <Image
            src={imageUrl}
            alt={title}
            width={200}
            height={200}
            className='rounded-md'
          />
        </div>
      )}

      <div className='mt-4'>
        <h3 className='text-3xl font-bold'>{title}</h3>
        <p className='text-sm text-gray-500 mb-2'>
          Posted by <span className='text-blue-500'>{author}</span> on{' '}
          <span className='text-blue-500'>{formatDate(created_at)}</span>
        </p>
        <div
          className={`text-lg text-justify ${
            readMore
              ? 'h-full transition-h duration-[1000ms]'
              : 'max-h-[315px] transition-h overflow-hidden duration-[1000ms]'
          }`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div className='flex justify-end'>
          <button
            className='text-blue-500 hover:text-blue-600 duration-300'
            onClick={toggleReadMore}
          >
            {readMore
              ? `${language === 'en' ? 'Read Less' : 'Скрыть'}`
              : `${language === 'en' ? 'Read More' : 'Читать далее'}`}
          </button>
        </div>
        {user && (
          <div className='flex flex-col justify-center items-center md:flex-row gap-4'>
            <div
              onClick={handleDelete}
              className='flex items-center'
            >
              <DeletePostButton />
            </div>
            <div
              onClick={handleEdit}
              className='flex items-center'
            >
              <EditPostButton />
            </div>
          </div>
        )}
      </div>
      {editPostModal && (
        <EditPost
          setEditPostModal={setEditPostModal}
          user={user}
          key={id}
          id={id}
          createdAt={created_at}
          title={title}
          author={author}
          content={content}
          imageUrl={imageUrl}
        />
      )}
    </div>
  );
};

export default IndividualNewsPost;
