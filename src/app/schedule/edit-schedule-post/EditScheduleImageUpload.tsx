'use client';
import { useState } from 'react';
import { SchedulePostTypes } from '../../utils/types/schedulePostTypes';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useLanguageStore } from '../../utils/stores/languageStore';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoMdCloudUpload } from 'react-icons/io';
import Image from 'next/image';
import Loading from '@/src/app/components/reusable/Loading';
import deleteScheduleImage from '@/src/app/utils/deleteImage';

const EditScheduleImageUpload = ({
  setAddImageModal,
  setSchedulePostEditData,
  schedulePostEditData,
}: {
  setAddImageModal: any;
  setSchedulePostEditData: any;
  schedulePostEditData: SchedulePostTypes;
}) => {
  const supabaseSchedule = createClientComponentClient();
  const { language } = useLanguageStore();
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Handle Image Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      setImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  // Check if Image File exists in DB and return URL || Modified URL
  const checkFileExists = async (file: File): Promise<string | null> => {
    const { data: fileList, error: fileListError } =
      await supabaseSchedule.storage.from('schedule-post-images').list('');

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

  // Handle Image Upload
  const handleUploadImage = async () => {
    setIsUploading(true);
    if (schedulePostEditData?.scheduleImageUrl) {
      deleteScheduleImage({
        imageUrl: schedulePostEditData.scheduleImageUrl,
        table_name: 'schedule-post-images',
      });
    }
    if (!file) return;

    const modifiedFileName = await checkFileExists(file);
    const uploadFileName = modifiedFileName || file.name;

    const { data, error } = await supabaseSchedule.storage
      .from('schedule-post-images')
      .upload(uploadFileName, file);

    if (error) {
      console.error('Error uploading file:', error);
      return;
    }

    setSchedulePostEditData((prevData: SchedulePostTypes) => ({
      ...prevData,
      scheduleImageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/schedule-post-images/${data?.path}`,
    }));
    setIsUploading(false);
    setAddImageModal(false);
  };

  return (
    <div className='z-[1000] fixed top-0 left-0 w-screen h-screen bg-gray-800 flex flex-col justify-center items-center'>
      {isUploading && <Loading message='Uploading Image...' />}
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
            <div className='flex flex-col justify-center items-center p-4 text-center text-white'>
              <IoMdCloudUpload size={60} />
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
            {language === 'en' ? 'Edit Image' : 'Редактировать изображение'}
          </button>
        </>
      )}
    </div>
  );
};

export default EditScheduleImageUpload;
