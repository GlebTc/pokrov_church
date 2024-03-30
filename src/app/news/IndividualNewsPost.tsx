import Image from 'next/image';
import church_front from '@/public/church_front.webp';

interface IndividualNewsPostProps {
  id: string;
  createdAt: string;
  title: string;
  author: string;
  content: string;
  imageUrl: string;
}

const IndividualNewsPost: React.FC<IndividualNewsPostProps> = ({
  id,
  createdAt,
  title,
  author,
  content,
  imageUrl,
}) => {
  return (
    <div className='max-w-4xl mx-auto my-8'>
      <div className='w-[200px] '>
        <Image
          src={church_front} // Use props.imageUrl instead of post.imageUrl
          alt={title} // Use props.title instead of post.title
          className='w-[200px] h-auto rounded-md'
        />
      </div>

      <div className='mt-4'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='text-sm text-gray-500 mb-2'>
          Posted by {author} on {createdAt}{' '}
          {/* Use props.author and props.createdAt */}
        </p>
        <p className='text-lg'>{content}</p>
      </div>
    </div>
  );
};

export default IndividualNewsPost;
