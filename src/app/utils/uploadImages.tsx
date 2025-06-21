/*
This component will uplaodImages based on file and table_name to supabase storage.

==============================================================
=====                      Arguments                     =====
==============================================================
1. file: File
2. table_name: string

==============================================================
=====                  Trouble Shooting                  =====
==============================================================
1. If there arre no errors but the images are nto deleting, check supabase RLS settings.

==============================================================
=====                Components Used In                  =====
==============================================================
1. NewsImageUpload.tsx

*/

import { createClient } from '@/src/app/utils/supabase';

const uploadImages = async ({
  file,
  table_name,
}: {
  file: File;
  table_name: string;
}) => {
  const supabase = createClient();
  try {
    // Check if Image File exists in DB and return URL || Modified URL
    const checkFileExists = async (file: File): Promise<string | null> => {
      const { data: fileList, error: fileListError } = await supabase.storage
        .from(`${table_name}`)
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

    const modifiedFileName = await checkFileExists(file);
    const uploadFileName = modifiedFileName || file.name;

    const { data, error } = await supabase.storage
      .from(`${table_name}`)
      .upload(uploadFileName, file);

    if (error) {
      console.error('Error uploading file:', error);
      return;
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${table_name}/${data?.path}`;
    return imageUrl;
  } catch (error) {
    console.error('Error in uploadImages:', error);
    return;
  }
};

export default uploadImages;
