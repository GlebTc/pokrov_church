'use client';
import { useState } from 'react';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useNewsStore } from '@/src/app/utils/stores/NewsStore';
import { NewsType } from '../utils/types/newsTypes';
import Tiptap from '../components/reusable/textEditor.tsx/Tiptap';
import ImageUpload from '../components/reusable/ImageUpload';
import Image from 'next/image';

const AddNewPost = ({
  setNewPostModal,
  user,
}: {
  setNewPostModal: any;
  user: any;
}) => {
  const [addImageModal, setAddImageModal] = useState<boolean>(false);
  const { language } = useLanguageStore();

  const [formData, setFormData] = useState<NewsType>({
    id: '',
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

  // Handle Submit Function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a New post object
    const newsPost: NewsType = {
      id: '',
      created_at: formData.created_at,
      title: formData.title,
      content: formData.content,
      author: user.email,
      imageUrl: formData.imageUrl,
    };
    // Send a POST request using the createNewsPost function from newsStore, clear the form data and close the modal.
    try {
      createNewsPost(newsPost);
      setFormData({
        id: '',
        title: '',
        content: '',
        author: '',
        imageUrl: '',
        created_at: '',
      });

      setNewPostModal(false);
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setFormData({
      id: '',
      title: '',
      content: '',
      author: '',
      imageUrl: '',
      created_at: '',
    });
    setNewPostModal(false);
  };

  return (
    <div className='ADD_NEW_POST_MAIN_FORM_CONTAINER fixed inset-0 flex flex-col justify-center items-center bg-gray-600/90 w-full p-8 text-white z-[40]'>
      <h2 className='text-2xl font-bold mb-4'>
        {language === 'en' ? 'Add New Post' : 'Добавить новость'}
      </h2>
      <div className='ADD_IMAGE_CONTAINER flex justify-start w-[90dvw] md:w-[70dvw] mt-4'>
        {addImageModal && (
          <ImageUpload
            setAddImageModal={setAddImageModal}
            setFormData={setFormData}
            formData={formData}
          />
        )}
      </div>
      <div>
        {formData.imageUrl && (
          <div className='w-[200px] '>
            <Image
              src={formData.imageUrl}
              alt={formData.title}
              width={200}
              height={200}
              className='rounded-md'
            />
          </div>
        )}
      </div>
      <button
        className='bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-500 w-[200px] mt-4'
        onClick={() => setAddImageModal(true)}
      >
        {language === 'en'
          ? formData.imageUrl
            ? 'Change Image'
            : 'Add Image'
          : 'Добавить изображение'}
      </button>
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
          <div className='mb-4 max-h-[15dvh] overflow-scroll'>
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
