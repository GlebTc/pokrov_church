'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Types Imports
import { NewsPostTypes } from '@/src/app/utils/types/newsPostTypes';

// Stores Imports
import { useNewsPostsStore } from '@/src/app/utils/stores/newsPostsStore';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';

// Rendering Components Imports
import NewsImageModal from '@/src/app/news/NewsImageModal';
import DeleteNewsPostButton from './(newsPostButtons)/DeleteNewsPostButton';
import EditNewsPostButton from '@/src/app/news/(newsPostButtons)/EditNewsPostButton';

// Functional Components Imports
import { formatPostDate } from '@/src/app/utils/dateFormat';

const IndividualNewsPost: React.FC<any | NewsPostTypes> = ({
  user,
  id,
  created_at,
  title,
  author,
  content,
  newsImageUrl,
}) => {
  const { deleteNewsPost } = useNewsPostsStore();
  const [individualNewsModal, setIndividualNewsModal] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const { language } = useLanguageStore();

  // Handle Delete Function
  const handleDelete = () => {
    deleteNewsPost(id);
  };

  // Handle Toggle Read More
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <div
      key={id}
      className='flex flex-col mt-8'
    >
      <h3 className='text-xl font-semibold text-center mb-4'>{title}</h3>
      <p className='mb-4 text-center'>
        {useLanguageStore().language === 'en' ? 'Posted on ' : 'Опубликовано '}
        <span className='text-blue-500'>{formatPostDate(created_at)}</span>
        {useLanguageStore().language === 'en' ? ' by ' : ' от '}
        <span className='text-blue-500'>{author}</span>
      </p>

      <div
        className={`text-lg text-justify w-full${
          readMore
            ? 'h-full transition-h duration-[1000ms]'
            : 'max-h-[200px] transition-h overflow-hidden duration-[1000ms]'
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

      <div className='w-full flex justify-center'>
        {newsImageUrl ? (
          <Image
            onClick={() => setIndividualNewsModal(true)}
            src={newsImageUrl}
            alt='Schedule Image'
            width={500}
            height={600}
            className='rounded-md p-1 border-2 object-contain cursor-pointer'
          />
        ) : (
          <p className='text-center text-gray-500'>
            {useLanguageStore().language === 'en'
              ? 'No Image Available'
              : 'Изображение отсутствует'}
          </p>
        )}
      </div>
      {user && (
        <div className='flex flex-col md:flex-row justify-center gap-4'>
          <div
            className='flex justify-center items-center gap-4 mt-4'
            onClick={handleDelete}
          >
            <DeleteNewsPostButton />
          </div>
          <Link
            href={`/news/edit-news-post/${id}`}
            className='flex justify-center items-center gap-4 mt-4'
          >
            <EditNewsPostButton />
          </Link>
        </div>
      )}
      {individualNewsModal && (
        <NewsImageModal
          setIndividualNewsModal={() => setIndividualNewsModal(false)}
          newsImageUrl={newsImageUrl}
        />
      )}
    </div>
  );
};

export default IndividualNewsPost;


