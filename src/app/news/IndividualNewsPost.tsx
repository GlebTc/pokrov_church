'use client';
import Image from 'next/image';
import { useNewsStore } from '../utils/stores/NewsStore';
import DeletePostButton from './DeletePostButton';
import { useState } from 'react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface IndividualNewsPostProps {
  user: any;
  id: string;
  createdAt: string;
  title: string;
  author: string;
  content: string;
  imageUrl: string;
  setDeletedPostIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const IndividualNewsPost: React.FC<IndividualNewsPostProps> = ({
  id,
  createdAt,
  title,
  author,
  content,
  imageUrl,
  setDeletedPostIds,
  user,
}) => {
  const { deletePost } = useNewsStore();
  const [readMore, setReadMore] = useState<boolean>(false);

  // const supabase = createClientComponentClient();

  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2-digit day
    const month = date.toLocaleString('en-US', { month: 'long' }); // Full month name
    const year = date.getFullYear().toString(); // 4-digit year
    return `${month} ${day}, ${year}`;
  };

  const handleDelete = async () => {
    setDeletedPostIds((prevIds) => [...prevIds, id]);
    deletePost(id);
    // Logic for deleting image from Supabase storage
    // const fileName = imageUrl.split('/').pop(); // Extract the file name from the URL
    // if (fileName) {
    //   await supabase.storage.from('news_post_images').remove([fileName]); // Delete the image from Supabase storage
    // }
  };

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  return (
    <div className='INDIVIDUAL_NEWS_POST_CONTAINER max-w-4xl mx-auto my-8'>
      {imageUrl && (
        <div className='w-[200px] '>
          <Image
            src={imageUrl} // Use props.imageUrl instead of post.imageUrl
            alt={title} // Use props.title instead of post.title
            width={200}
            height={200}
            className='rounded-md'
          />
        </div>
      )}

      <div className='mt-4'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='text-sm text-gray-500 mb-2'>
          Posted by {author} on {formatDate(createdAt)}{' '}
        </p>
        <p
          className={`text-lg text-justify ${
            readMore
              ? 'h-full duration-[1000ms]'
              : 'max-h-[315px] overflow-hidden duration-[1000ms]'
          }`}
        >
          {content}
        </p>
        <div className='flex justify-end'>
          <button
            className='text-blue-400 hover:text-blue-500 duration-300'
            onClick={toggleReadMore}
          >
            {readMore ? 'Read Less' : 'Read More'}
          </button>
        </div>
        {user && (
          <div onClick={handleDelete}>
            <DeletePostButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualNewsPost;
