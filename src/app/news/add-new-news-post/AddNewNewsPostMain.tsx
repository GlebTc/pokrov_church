'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Types Imports
import { User } from '@supabase/supabase-js';
import { NewsPostTypes } from '@/src/app/utils/types/newsPostTypes';

// Stores Imports
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useNewsPostsStore } from '@/src/app/utils/stores/newsPostsStore';

// Rendering Components Imports
import NewsImageUpload from '@/src/app/news/add-new-news-post/NewsImageUpload';
import Unauthorized from '@/src/app/components/reusable/Unauthorized';

// Functional Components Imports
import Tiptap from '@/src/app/components/reusable/textEditor/Tiptap';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const AddNewNewsPostMain = ({ user }: { user: User | null }) => {
  // Initializations
  const supabaseNews = createClientComponentClient();
  const { language } = useLanguageStore();
  const router = useRouter();
  const { createNewsPost } = useNewsPostsStore();

  // States
  const [addImageModal, setAddImageModal] = useState(false);
  const [newNewsPostFormData, setNewNewsPostFormData] = useState<NewsPostTypes>(
    {
      id: '',
      title: '',
      author: user?.email || '',
      content: '',
      newsImageUrl: '',
      created_at: new Date().toISOString().slice(0, 10),
    }
  );

  // Handle Change Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewNewsPostFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleContentChange Function
  const handleContentChange = (contentInput: any) => {
    setNewNewsPostFormData((prevData) => ({
      ...prevData,
      content: contentInput,
    }));
  };

  // Form Submit Function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewsPost(newNewsPostFormData);
    setNewNewsPostFormData({
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
  const handleCancel = async () => {
    // Delete stored image prior to cancel
    if (newNewsPostFormData?.newsImageUrl) {
      const imageName = newNewsPostFormData.newsImageUrl.split('/').pop() ?? '';
      const { data, error } = await supabaseNews.storage
        .from('news_post_images')
        .remove([imageName]);

      if (error) {
        console.error('Error deleting image:', error.message);
        return;
      }
    }

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
        {language === 'en' ? 'Add New News Post' : 'Добавить новость'}
      </h2>
      {addImageModal && (
        <NewsImageUpload
          setAddImageModal={setAddImageModal}
          setNewNewsPostFormData={setNewNewsPostFormData}
          newNewsPostFormData={newNewsPostFormData}
        />
      )}
      <div className='UPLOADED_IMAGE_CONTAINER mb-4'>
        {newNewsPostFormData.newsImageUrl && (
          <div className='w-[300px] '>
            <Image
              src={newNewsPostFormData.newsImageUrl}
              alt={newNewsPostFormData.title}
              width={300}
              height={300}
              className='rounded-md object-cover'
            />
          </div>
        )}
      </div>
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
            value={newNewsPostFormData.created_at}
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
            value={newNewsPostFormData.title}
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
            value={newNewsPostFormData.author}
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
            content={newNewsPostFormData.content}
            onChange={(inputContent: any) => handleContentChange(inputContent)}
          />
        </div>
      </form>

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
          {language === 'en' ? 'Add New News Post' : 'Добавить новость'}
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

export default AddNewNewsPostMain;
