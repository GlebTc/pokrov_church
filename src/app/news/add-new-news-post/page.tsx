import AddNewNewsPostMain from '@/src/app/news/add-new-news-post/AddNewNewsPostMain';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const page = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();


  return (
    <div>
      <AddNewNewsPostMain user={user}/>
    </div>
  );
};

export default page;
