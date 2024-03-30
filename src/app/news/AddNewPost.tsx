'use client';
import { useState } from 'react';
import { useNewsStore } from '@/src/app/utils/stores/NewsStore';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NewsType } from '../utils/types/newsTypes';

interface FormData {
  title: string;
  content: string;
  author: string;
  imageUrl: string;
}

const AddNewPost = ({ setNewPostModal }: { setNewPostModal: any }) => {
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    author: '',
    imageUrl: '',
  });

  const { createNewsPost } = useNewsStore();

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

    const newsPost: NewsType = {
      id: '',
      created_at: new Date().toISOString(), // Set the current timestamp
      title: formData.title,
      content: formData.content,
      author: formData.author,
      imageUrl: formData.imageUrl,
    };

    try {
      createNewsPost(newsPost);

      setFormData({
        title: '',
        content: '',
        author: '',
        imageUrl: '',
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
    });
    setNewPostModal(false);
  };

  return (
    <div className='MAIN_FORM_CONTAINER fixed inset-0 z-[50] flex flex-col justify-center items-center bg-gray-900/90 w-full p-8 text-white'>
      <h2 className='text-2xl font-bold mb-4'>Add New Post</h2>
      {imageUploading && <p>Uploading image...</p>}
      <form onSubmit={handleSubmit}>
        <div className='FORM_CONTAINER mb-4 w-[90dvw] md:w-[70dvw]'>
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-sm font-medium'
            >
              Title
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
              htmlFor='content'
              className='block text-sm font-medium'
            >
              Content
            </label>
            <textarea
              id='content'
              name='content'
              value={formData.content}
              onChange={handleChange}
              rows={4}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-800'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='author'
              className='block text-sm font-medium'
            >
              Author
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
            Upload Image
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

        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
        >
          Add Post
        </button>
      </form>
      <button
        className='close-button'
        onClick={handleCloseModal}
      >
        Close
      </button>
    </div>
  );
};

export default AddNewPost;
