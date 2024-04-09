'use client';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoMdCloudUpload } from 'react-icons/io';
import Image from 'next/image';

/* ==============================TEST============================== 

  <button
    className='bg-blue-300 p-2 rounded-xl mt-20'
    onClick={() => setAddImageModal(true)}
  >
    TEST BUTTON
  </button>
{addImageModal && <ImageUpload setAddImageModal={setAddImageModal} />} 

 ========================================================================= */

const ImageUpload = ({ setAddImageModal }: { setAddImageModal: any }) => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('No Selected File');

  return (
    <div className='z-[1000] fixed top-0 left-0 w-screen h-screen bg-gray-800 flex justify-center items-center'>
      <div className='absolute top-5 right-5 flex justify-end p-4'>
        <AiFillCloseCircle
          className='text-3xl text-white cursor-pointer'
          onClick={() => setAddImageModal(false)}
        />
      </div>
      <div
        className='border-2 border-dashed border-blue-300 w-[300px] h-[300px] cursor-pointer rounded-md'
        onClick={() =>
          (document.querySelector('.imageUpload') as HTMLInputElement).click()
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (files && files.length > 0) {
            const file = files[0];
            setFileName(file.name);
            setImage(URL.createObjectURL(file));
          }
        }}
      >
        <form className='flex justify-center h-full items-center relative'>
          <input
            type='file'
            accept='image/*'
            className='imageUpload'
            hidden
          />
          {image ? (
            <Image
              src={image}
              alt={fileName}
              fill
              className='object-contain'
            />
          ) : (
            <IoMdCloudUpload
              size={60}
              className='text-white'
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;
