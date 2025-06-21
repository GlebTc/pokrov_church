'use client';
import { useState, useEffect } from 'react';

// Stores Imports
import { useLanguageStore } from '../../utils/stores/languageStore';

// Rendering Components Imports
import Loading from '@/src/app/components/reusable/Loading';
import IndividualImageContainer from '@/src/app/our-parish/gallery/IndividualImageContainer';

// Functional Components Imports
import { createClient } from '@/src/app/utils/supabase';

const Gallery = () => {
  // Initializations
  const { language } = useLanguageStore();
  const supabaseImages = createClient();

  // States
  const [imagesArary, setImagesArray] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Images from schedule-post-images and news-post-images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data: scheduleImages, error: scheduleError } =
          await supabaseImages.storage.from('schedule-post-images').list();
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
                '/storage/v1/object/public/schedule-post-images/' +
                imageName
              );
            }
          );

          const { data: newsImages, error: newsError } =
            await supabaseImages.storage.from('news-post-images').list();
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
                  '/storage/v1/object/public/news-post-images/' +
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

  if (loading) {
    return <Loading message='Loading Images...' />;
  }

  return (
    <div className='GALLERY_MAIN_CONTAINER flex flex-col gap-8'>
      <h2 className='GALLERY_MAIN_HEADING_CONTAINER text-3xl font-semibold mb-8'>
        {language === 'en' ? 'Gallery' : 'Галерея'}
      </h2>
      <div className='GALLERY_IMAGES_CONTAINER grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {imagesArary.map((imageUrl, index) => (
          <IndividualImageContainer
            key={index}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
