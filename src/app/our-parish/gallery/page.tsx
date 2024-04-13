'use client';
import { useState, useEffect } from 'react';

// Stores Imports
import { useLanguageStore } from '../../utils/stores/languageStore';

// Rendering Components Imports
import Loading from '@/src/app/components/reusable/Loading';
import IndividualImageContainer from '@/src/app/our-parish/gallery/IndividualImageContainer';

// Functional Components Imports
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Gallery = () => {
  // Initializations
  const { language } = useLanguageStore();
  const supabaseImages = createClientComponentClient();

  // States
  const [imagesArary, setImagesArray] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Images from schedule_post_images and news_post_images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data: scheduleImages, error: scheduleError } =
          await supabaseImages.storage.from('schedule_post_images').list();
        // filter out 0 index item
        if (scheduleImages) {
          const scheduleImagesArray = scheduleImages.filter(
            (item, index) => index !== 0
          );
          const scheduleImagesNamesArray = scheduleImagesArray.map(
            (image: any) => image.name
          );
          const scheduleImagesUrlsArray = scheduleImagesNamesArray.map(
            (imageName: string) => {
              return (
                process.env.NEXT_PUBLIC_SUPABASE_URL +
                '/storage/v1/object/public/schedule_post_images/' +
                imageName
              );
            }
          );

          const { data: newsImages, error: newsError } =
            await supabaseImages.storage.from('news_post_images').list();
          // filter out 0 index item
          if (newsImages) {
            const newsImagesArray = newsImages.filter(
              (item, index) => index !== 0
            );
            const newsImagesNamesArray = newsImagesArray.map(
              (image: any) => image.name
            );
            const newsImagesUrlsArray = newsImagesNamesArray.map(
              (imageName: string) => {
                return (
                  process.env.NEXT_PUBLIC_SUPABASE_URL +
                  '/storage/v1/object/public/news_post_images/' +
                  imageName
                );
              }
            );

            const allImagesUrlsArray = [
              ...scheduleImagesUrlsArray,
              ...newsImagesUrlsArray,
            ];
            setImagesArray(allImagesUrlsArray);
          }
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2 className='text-3xl font-semibold mb-8'>
        {language === 'en' ? 'Gallery' : 'Галерея'}
      </h2>
      {loading ? (
        <Loading message={'Loading Images'} />
      ) : (
        <div className='flex justify-center items-center flex-wrap gap-4'>
          {imagesArary.map((imageUrl, index) => (
            <IndividualImageContainer
              key={index}
              imageUrl={imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
