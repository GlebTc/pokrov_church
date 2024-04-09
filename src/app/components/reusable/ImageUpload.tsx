'use client';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoMdCloudUpload } from 'react-icons/io';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { NewsType } from '../../utils/types/newsTypes';

/* ==============================TEST============================== 

 import ImageUpload from '@/src/app/components/reusable/ImageUpload';

 const [addImageModal, setAddImageModal] = useState(false);

  <div className='ADD_IMAGE_BUTTON flex justify-start w-[90dvw] md:w-[70dvw] mt-4'>
    <button
      className='bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-500 w-[200px] mb-4'
      onClick={() => setAddImageModal(true)}
    >
      {language === 'en' ? 'Add Image' : 'Добавить изображение'}
    </button>
    {addImageModal && (
      <ImageUpload
        setAddImageModal={setAddImageModal}
        setFormData={setFormData}
        formData={formData}
      />
    )}
  </div>

 ========================================================================= */

const ImageUpload = ({
  setAddImageModal,
  setFormData,
  formData,
}: {
  setAddImageModal: any;
  setFormData: any;
  formData: NewsType;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const { language } = useLanguageStore();
  const [file, setFile] = useState<File | null>(null);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      setImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const checkFileExists = async (file: File): Promise<string | null> => {
    const { data: fileList, error: fileListError } = await supabase.storage
      .from('news_post_images')
      .list('');

    if (fileList && fileListError === null) {
      const fileExists = fileList.find((item) => item.name === file.name);

      if (fileExists) {
        const fileExt = file.name.split('.').pop();
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

  const handleUploadImage = async () => {
    if (!file) return;

    const modifiedFileName = await checkFileExists(file);
    const uploadFileName = modifiedFileName || file.name;

    const { data, error } = await supabase.storage
      .from('news_post_images')
      .upload(uploadFileName, file);

    if (error) {
      console.error('Error uploading file:', error);
      return;
    }

    setFormData((prevData: NewsType) => ({
      ...prevData,
      imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news_post_images/${data?.path}`,
    }));

    setAddImageModal(false);
  };

  return (
    <div className='z-[1000] fixed top-0 left-0 w-screen h-screen bg-gray-800 flex flex-col justify-center items-center'>
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
        onChange={handleChange}
      >
        <form className='flex justify-center h-full items-center relative hover:opacity-50 duration-300'>
          <input
            type='file'
            accept='image/*'
            className='imageUpload'
            hidden
          />
          {image ? (
            <Image
              src={image}
              alt={file?.name ? file.name : 'Uploaded Image'}
              fill
              className='object-contain'
            />
          ) : (
            <div className='flex flex-col justify-center items-center p-4 text-center'>
              <IoMdCloudUpload
                size={60}
                className='text-white'
              />
              <p>
                {language === 'en'
                  ? 'Click to upload an image'
                  : 'Нажмите для загрузки изображения'}
              </p>
            </div>
          )}
        </form>
      </div>
      {file?.name && (
        <>
          <div className='text-center text-white bg-blue-300 p-2 rounded-md mt-4 w-[300px]'>
            File Name: {file.name}
          </div>
          <button
            className='bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-500 w-[300px] mt-4'
            onClick={handleUploadImage}
          >
            {language === 'en' ? 'Add Image' : 'Добавить изображение'}
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
