import Image from 'next/image';
import church_front from '@/public/church_front.webp';

const IndividualPost = () => {
  const post = {
    id: 1,
    title: 'Sample Blog Post',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'John Doe',
    date: 'March 30, 2024',
    imageUrl: church_front,
  };

  return (
    <div className='max-w-4xl mx-auto my-8'>
      <Image
        src={post.imageUrl}
        alt={post.title}
        className='w-[40%] md:w-[20%] h-auto rounded-md'
      />

      <div className='mt-4'>
        <h1 className='text-3xl font-bold'>{post.title}</h1>
        <p className='text-sm text-gray-500 mb-2'>
          Posted by {post.author} on {post.date}
        </p>
        <p className='text-lg'>{post.content}</p>
      </div>
    </div>
  );
};

export default IndividualPost;
