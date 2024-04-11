'use client';
import { useEffect } from 'react';
import { SchedulePostTypes } from '@/src/app/utils/types/schedulePostTypes';
import { useLanguageStore } from '@/src/app/utils/stores/languageStore';
import { useSchedulePostsStore } from '@/src/app/utils/stores/schedulePostsStore';

import Loading from '@/src/app/components/reusable/Loading';
import IndividualSchedulePost from './IndividualSchedulePost';
import AddNewSchedulePostButton from '@/src/app/schedule/add-new-schedule-post/AddNewSchedulePostButton';
import Link from 'next/link';

const ScheduleMain = ({ user }: { user: any }) => {
  const { language } = useLanguageStore();
  const { schedulePosts, fetchSchedulePosts, isLoading } =
    useSchedulePostsStore();

  // Fetch updated schedule posts on render
  useEffect(() => {
    fetchSchedulePosts();
  }, [schedulePosts]);

  // Sort news articles by createdAt timestamp from newest to oldest
  const sortedSchedulePosts = schedulePosts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <div className='bg-white w-full p-8 flex flex-col gap-4'>
      <div className='flex flex-col justify-center items-center md:flex-row md:justify-between md:items-start'>
        <h2 className='text-3xl font-semibold mb-4'>
          {language === 'en' ? 'Schedule' : 'Расписание'}
        </h2>
        <Link href='/schedule/add-new-schedule-post'>
          {user && <AddNewSchedulePostButton />}
        </Link>
      </div>

      {isLoading ? (
        <Loading message='Retrieving Updated Schedule...' />
      ) : (
        <div>
          {sortedSchedulePosts &&
            sortedSchedulePosts.map((post: SchedulePostTypes) => (
              <IndividualSchedulePost
                user={user}
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
