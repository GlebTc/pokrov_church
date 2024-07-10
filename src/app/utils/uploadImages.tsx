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

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const uploadImages = async (file: File, table_name: string) => {
  // Initialize supabase client
  const supabase = createClientComponentClient();

  console.log(`Uploading image to ${table_name}`);

  // Check if file exists in supabase database.  If the file already exists in database, modify the file name to add _001, _002, _003, etc.  Once the check is complete, the checkFileExists functions returns the modified file name or null.

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

  // Handle Image Upload
  const handleUploadImage = async () => {
    // Check if file exists in database
    const modifiedFileName = await checkFileExists(file);

    const uploadFileName = modifiedFileName || file.name;

    // Upload file to database
    const { data, error } = await supabase.storage
      .from(`${table_name}`)
      .upload(uploadFileName, file);
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${table_name}/${data?.path}`;
    console.log(`Image ${imageUrl} uploaded to ${table_name}`);
    return imageUrl;
  };

  handleUploadImage();
};

export default uploadImages;
