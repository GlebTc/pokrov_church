'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Types
import { NewsPostTypes } from '@/src/app/utils/types/newsPostTypes';
import { User } from '@supabase/supabase-js';

//Stores
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useNewsPostsStore } from '@/src/app/utils/stores/newsPostsStore';

// Components
// import newsImageUpload from '@/src/app/news/add-new-news-post/newsImageUpload';
import Unauthorized from '@/src/app/components/reusable/Unauthorized';

// Functional Components Imports
import Tiptap from '@/src/app/components/reusable/textEditor/Tiptap';

const EditNewsPostMain = ({
  user,
  postData,
}: {
  user: User | null;
  postData: any;
}) => {
  const { language } = useLanguageStore();
  const router = useRouter();
  const { editPost } = useNewsPostsStore();

  // States
  const [addImageModal, setAddImageModal] = useState(false);
  const [newsPostEditData, setNewsPostEditData] = useState<NewsPostTypes>({
    id: postData[0]?.id,
    title: postData[0]?.title,
    author: postData[0]?.author,
    content: postData[0]?.content,
    newsImageUrl: postData[0]?.newsImageUrl,
    created_at: new Date().toISOString().slice(0, 10),
  });

  // Handle Change Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewsPostEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Content Change

  const handleContentChange = (contentInput: any) => {
    setNewsPostEditData((prevData) => ({
      ...prevData,
      content: contentInput,
    }));
  };

  // Form Submit Function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editPost(newsPostEditData.id, newsPostEditData);
    setNewsPostEditData({
      id: '',
      title: '',
      author: '',
      content: '',
      newsImageUrl: '',
      created_at: '',
    });
    router.push('/news');
  };

  // Cancel Function
  const handleCancel = () => {
    router.push('/news');
  };

  // Unauthorized User
  if (!user) {
    return (
      <div>
        <Unauthorized />
      </div>
    );
  }

  return (
    <div className='ADD_NEW_POST_MAIN_FORM_CONTAINER inset-0 flex flex-col justify-center items-center'>
      <h2 className='text-2xl font-bold mb-4'>
        {language === 'en' ? 'Edit News Post' : 'Редактировать расписание'}
      </h2>
      {/* {addImageModal && (
        <newsImageUpload
          setAddImageModal={setAddImageModal}
          setnewsPostEditData={setnewsPostEditData}
          newsPostEditData={newsPostEditData}
        />
      )} */}
      <form className='w-full'>
        <div className='mb-4'>
          <label
            htmlFor='created_at'
            className='block text-sm font-medium'
          >
            {language === 'en' ? 'Created At' : 'Дата создания'}
          </label>
          <input
            type='date'
            id='created_at'
            name='created_at'
            value={newsPostEditData.created_at}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='title'
            className='block text-sm font-medium'
          >
            {language === 'en' ? 'Title' : 'Заголовок'}
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={newsPostEditData.title}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='author'
            className='block text-sm font-medium'
          >
            {language === 'en' ? 'Author' : 'Автор'}
          </label>
          <input
            type='text'
            id='author'
            name='author'
            value={newsPostEditData.author}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='content'
            className='block text-sm font-medium'
          >
            {language === 'en' ? 'Content' : 'Содержание'}
          </label>

          <Tiptap
            content={newsPostEditData.content}
            onChange={(inputContent: any) => handleContentChange(inputContent)}
          />
        </div>
      </form>
      <div className='UPLOADED_IMAGE_CONTAINER mb-4'>
        {newsPostEditData.newsImageUrl && (
          <div className='w-[300px] '>
            <Image
              src={newsPostEditData.newsImageUrl}
              alt={newsPostEditData.title}
              width={300}
              height={300}
              className='rounded-md'
            />
          </div>
        )}
      </div>
      <div className='BUTTONS_CONTAINER flex flex-col sm:flex-row gap-4'>
        <button
          className='bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-500 duration-300'
          onClick={() => setAddImageModal(true)}
        >
          {language === 'en' ? 'Add Image' : 'Добавить изображение'}
        </button>
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 duration-300'
          onClick={handleSubmit}
        >
          {language === 'en' ? 'Edit news Post' : 'Редактировать расписани'}
        </button>
        <button
          className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500 duration-300'
          onClick={handleCancel}
        >
          {language === 'en' ? 'Cancel' : 'Отменить'}
        </button>
      </div>
    </div>
  );
};

export default EditNewsPostMain;
