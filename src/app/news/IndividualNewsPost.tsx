import Image from 'next/image';
import { useNewsStore } from '../utils/stores/NewsStore';
import DeletePostButton from './DeletePostButton';

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

  const handleDelete = () => {
    setDeletedPostIds((prevIds) => [...prevIds, id]);
    deletePost(id); // Call the deletePost function with the post ID
  };
  return (
    <div className='max-w-4xl mx-auto my-8'>
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
          Posted by {author} on {createdAt}{' '}
          {/* Use props.author and props.createdAt */}
        </p>
        <p className='text-lg'>{content}</p>
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
