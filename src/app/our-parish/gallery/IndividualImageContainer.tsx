'use client';
import { useState } from 'react';
import Image from 'next/image';
import IndividualGalleryImageModal from './IndividualGalleryImageModal';

const IndividualImageContainer = ({ imageUrl }: { imageUrl: string }) => {
  const [individualGalleryImageModal, setIndividualGalleryImageModal] =
    useState(false);
  return (
    <div className='INDIVIDUAL_IMAGE_CONTAINER'>
      <Image
        onClick={() => setIndividualGalleryImageModal(true)}
        src={`${imageUrl}`}
        alt='Church'
        width={270}
        height={300}
        loading='lazy'
        quality={50}
        className='object-cover object-center hover:scale-105 duration-500 hover:shadow-xl hover:shadow-gray-500 rounded-xl cursor-pointer'
      />
      {individualGalleryImageModal && (
        <IndividualGalleryImageModal
          setIndividualScheduleModal={() =>
            setIndividualGalleryImageModal(false)
          }
          scheduleImageUrl={imageUrl}
        />
      )}
    </div>
  );
};

export default IndividualImageContainer;
