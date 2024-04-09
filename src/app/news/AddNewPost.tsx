'use client';
import { useState } from 'react';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useNewsStore } from '@/src/app/utils/stores/NewsStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NewsType } from '../utils/types/newsTypes';
import Loading from '../components/reusable/Loading';
import Tiptap from '../components/reusable/textEditor.tsx/Tiptap';

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

  // Check if the file already exists in the storage bucket and return a modified file name if needed
  const checkFileExists = async (file: File): Promise<string | null> => {
    const { data: fileList, error: fileListError } = await supabase.storage
      .from('news_post_images')
      .list('');

    if (fileList && fileListError === null) {
      const fileExists = fileList.find((item) => item.name === file.name);
      if (fileExists) {
        const fileExt = file.name.split('.').pop(); // Get file extension
        let modifiedFileName: string | null = null;
        let index = 1;
        do {
          modifiedFileName = `${file.name.replace(`.${fileExt}`, '')}_${index
            .toString()
            .padStart(3, '0')}.${fileExt}`;
          const fileWithIndexExists = fileList.find(
            (item) => item.name === modifiedFileName
          );
          if (fileWithIndexExists) {
            index++;
          } else {
            return modifiedFileName;
          }
        } while (modifiedFileName);
      }
    }

    return null;
  };

  // Handle Image Upload Function to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file already exists in the storage bucket
    const modifiedFileName = await checkFileExists(file);
    const uploadFileName = modifiedFileName || file.name;

    const { data, error } = await supabase.storage
      .from('news_post_images')
      .upload(uploadFileName, file);

    if (error) {
      console.error('Error uploading file:', error);
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news_post_images/${data?.path}`,
    }));

    setImageUploading(false);
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
            className={`mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 file:border-none file:bg-blue-500 file:hover:bg-blue-600 file:cursor-pointer file:text-white file:rounded-md file:duration-300`}
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
