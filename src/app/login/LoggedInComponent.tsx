import { User } from '@supabase/supabase-js';

const LoggedInComponent = ({
  user,
  language,
}: {
  user: User;
  language: string;
}) => {
  return (
<div className="bg-gray-200 p-4 rounded-md">
  <p className="text-lg font-semibold text-center">
    {language === 'en'
      ? `You are signed in as ${user.email}`
      : `Вы вошли как ${user.email}`}
  </p>
</div>

  );
};

export default LoggedInComponent;
