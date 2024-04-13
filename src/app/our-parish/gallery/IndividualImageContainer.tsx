import Image from 'next/image';

const IndividualImageContainer = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className='INDIVIDUAL_IMAGE_CONTAINER'>
      <Image
        src={`${imageUrl}`}
        alt='Church'
        width={250}
        height={300}
        loading='lazy'
        quality={50}
        className='object-cover object-center hover:scale-105 duration-500 hover:shadow-xl hover:shadow-gray-500 rounded-xl cursor-pointer'
      />
    </div>
  );
};

export default IndividualImageContainer;
