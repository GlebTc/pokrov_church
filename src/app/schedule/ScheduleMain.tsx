'use client';
import { useEffect } from 'react';
import { SchedulePostTypes } from '@/src/app/utils/types/schedulePostTypes';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useSchedulePostsStore } from '@/src/app/utils/stores/schedulePostsStore';
import Loading from '@/src/app/components/reusable/Loading';
import IndividualSchedulePost from './IndividualSchedulePost';
import AddNewSchedulePost from '@/src/app/schedule/add-new-schedule-post/AddNewSchedulePostButton';
import Link from 'next/link';

const ScheduleMain = ({ user }: { user: any }) => {
  const { language } = useLanguageStore();
  const { schedulePosts, fetchSchedulePosts, isLoading } =
    useSchedulePostsStore();

  useEffect(() => {
    fetchSchedulePosts();
  }, []);

  return (
    <div className='bg-white w-full p-8 flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-semibold mb-8'>
          {language === 'en' ? 'Schedule' : 'Расписание'}
        </h2>
        <Link href='/schedule/add-new-schedule-post'>
          {user && <AddNewSchedulePost />}
        </Link>
      </div>

      {isLoading ? (
        <Loading message='Retrieving Updated Schedule...' />
      ) : (
        <div>
          {schedulePosts &&
            schedulePosts.map((post: SchedulePostTypes) => (
              <IndividualSchedulePost
                key={post.id}
                id={post.id}
                created_at={post.created_at}
                title={post.title}
                author={post.author}
                scheduleImageUrl={post.scheduleImageUrl}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleMain;
