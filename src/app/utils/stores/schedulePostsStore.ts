import { create } from 'zustand';
import { SchedulePostTypes } from '@/src/app/utils/types/schedulePostTypes';
import { createClient } from '@supabase/supabase-js';

interface SchedulePostsStoreProps {
  schedulePosts: SchedulePostTypes[];
  fetchSchedulePosts: () => void;
  isLoading?: boolean;
  //   createSchedulePost: (schedulePost: SchedulePostTypes) => void;
  //   deletePost: (id: string) => void;
  //   editPost: (id: string, schedulePost: SchedulePostTypes) => void;
  //   getIndividualPost: (id: string) => void;
}

const supabaseSchedule = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const useSchedulePostsStore = create<SchedulePostsStoreProps>((set) => ({
  schedulePosts: [],
  isLoading: true,
  fetchSchedulePosts: async () => {
    const { data: schedulePosts, error } = await supabaseSchedule
      .from('schedule_posts')
      .select('*');
    if (schedulePosts) {
      set({ schedulePosts });
      set({ isLoading: false });
    }
  },
}));
