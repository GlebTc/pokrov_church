import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Logout from '../Logout';

const Archives = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //   console.log({ user });

  if (!user) {
    return <div>Not logged in</div>;
  }
  return (
    <div>
      <h1>Archives</h1>
    </div>
  );
};

export default Archives;
