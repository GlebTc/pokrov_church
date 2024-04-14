import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const deleteImage = async ({ imageUrl }: { imageUrl: string }) => {
  const supabaseSchedule = createClientComponentClient();
  console.log(`Deleting Current Image: ${imageUrl}`);
  try {
    const imageName = imageUrl.split('/').pop() ?? '';
    const { data, error } = await supabaseSchedule.storage
      .from('schedule_post_images')
      .remove([imageName]);
    console.log(`Deleted Image: ${imageName}`);
  } catch (error) {
    console.error('Error deleting image:', error);
    return;
  }
};

export default deleteImage;
