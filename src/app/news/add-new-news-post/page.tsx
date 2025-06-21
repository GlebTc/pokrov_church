import AddNewNewsPostMain from '@/src/app/news/add-new-news-post/AddNewNewsPostMain';
import { createServerSupabaseClient } from '@/src/app/utils/supabase';

const page = async () => {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <AddNewNewsPostMain user={user} />
    </div>
  );
};

export default page;
