'use client';
import { useState } from 'react';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useNewsStore } from '@/src/app/utils/stores/NewsStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NewsType } from '../utils/types/newsTypes';
import { FormData } from '../utils/types/unsortedTypes';
import Loading from '../components/reusable/Loading';
import Tiptap from '../components/reusable/textEditor.tsx/Tiptap';
import { create } from 'domain';

const AddNewPost = ({
  setNewPostModal,
  user,
}: {
  setNewPostModal: any;
  user: any;
}) => {
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const { language } = useLanguageStore();
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    author: user.email,
    imageUrl: '',
    created_at: '',
  });
  const { createNewsPost } = useNewsStore();

  const handleContentChange = (contentInput: any) => {
    setFormData((prevData) => ({
      ...prevData,
      content: contentInput,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

      // Convert the formData.created_at date string to a Date object
  const selectedDate = new Date(formData.created_at);

  // Get the ISO string format of the date and add the time component
  const isoDate = selectedDate.toISOString();

  // Remove milliseconds from the ISO string
  const formattedDate = isoDate.split('.')[0] + 'Z';

 

    const newsPost: NewsType = {
      id: '',
      created_at: formData.created_at,
      title: formData.title,
      content: formData.content,
      author: user.email,
      imageUrl: formData.imageUrl,
    };

    console.log(newsPost);

    try {
      createNewsPost(newsPost);

      setFormData({
        title: '',
        content: '',
        author: '',
        imageUrl: '',
        created_at: '',
      });

      setNewPostModal(false);
    } catch (error) {}
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const { data, error } = await supabase.storage
      .from('news_post_images')
      .upload(`${file.name}`, file);

    setFormData((prevData) => ({
      ...prevData,
      imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news_post_images/${data?.path}`,
    }));
    setTimeout(() => {
      setImageUploading(false);
    }, 2000);
    console.log(formData.imageUrl);
  };

  const handleCloseModal = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      imageUrl: '',
      created_at: '',
    });
    setNewPostModal(false);
  };

  return (
    <div className='ADD_NEW_POST_MAIN_FORM_CONTAINER fixed inset-0 flex flex-col justify-center items-center bg-gray-900/90 w-full p-8 text-white z-[120]'>
      <h2 className='text-2xl font-bold mb-4'>
        {language === 'en' ? 'Add New Post' : 'Добавить новость'}
      </h2>
      {imageUploading && <Loading message='Uploading Image...' />}
      <form onSubmit={handleSubmit}>
        <div className='FORM_CONTAINER mb-4 w-[90dvw] md:w-[70dvw]'>
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
              value={formData.title}
              onChange={handleChange}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
              required
            />
          </div>
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
              value={formData.created_at}
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
              content={formData.content}
              onChange={(inputContent: any) =>
                handleContentChange(inputContent)
              }
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
              value={formData.author}
              onChange={handleChange}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
              required
            />
          </div>
        </div>
        <div className='IMAGE_UPLOAD_CONTAINER mb-4'>
          <label
            htmlFor='imageUpload'
            className='block text-sm font-medium'
          >
            {language === 'en' ? 'Upload Image' : 'Загрузить изображение'}
          </label>
          <input
            type='file'
            id='imageUpload'
            name='imageUpload'
            accept='image/*'
            onChange={handleImageUpload}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
          />
        </div>

        <div className='ADD_NEW_POST_BUTTONS_CONTAINER flex flex-col gap-4'>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 max-w-[200px]'
          >
            {language === 'en' ? 'Add New Post' : 'Добавить новость'}
          </button>
          <button
            className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500 max-w-[200px]'
            onClick={handleCloseModal}
          >
            {language === 'en' ? 'Cancel' : 'Отмена'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewPost;
