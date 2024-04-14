import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const deleteImage = async ({
  imageUrl,
  table_name,
}: {
  imageUrl: string;
  table_name: string;
}) => {
  const supabaseSchedule = createClientComponentClient();
  try {
    const imageName = imageUrl.split('/').pop() ?? '';
    const { data, error } = await supabaseSchedule.storage
      .from(`${table_name}`)
      .remove([imageName]);
  } catch (error) {
    return;
  }
};

export default deleteImage;
