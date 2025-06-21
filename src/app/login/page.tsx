import LoginComponent from './LoginComponent';
import { createServerSupabaseClient } from '@/src/app/utils/supabase';

const page = async () => {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <LoginComponent user={user} />
    </div>
  );
};

export default page;
