/*
This component deletes an imagefile from supabase database based on imageURL and supabase bucket name (table name)

==============================================================
=====                      Arguments                     =====
==============================================================
1. imageUrl: string
2. table_name: string

==============================================================
=====                  Trouble Shooting                  =====
==============================================================
1. If there arre no errors but the images are nto deleting, check supabase RLS settings.


==============================================================
=====                Components Used In                  =====
==============================================================
1. AddNewNewsPostMain.tsx

*/


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
    // Split the imageUrl string into an array and get the last element
    const imageName = imageUrl.split('/').pop() ?? '';
    const { data, error } = await supabaseSchedule.storage
      .from(`${table_name}`)
      .remove([imageName]);
  } catch (error) {
    return;
  }
};

export default deleteImage;
