import { create } from 'zustand';
import { SchedulePostTypes } from '@/src/app/utils/types/schedulePostTypes';
import { createClient } from '@/src/app/utils/supabase';
import deleteScheduleImage from '@/src/app/utils/deleteImage';

interface SchedulePostsStoreProps {
  schedulePosts: SchedulePostTypes[];
  fetchSchedulePosts: () => void;
  isLoading?: boolean;
  createSchedulePost: (schedulePost: SchedulePostTypes) => void;
  deletePost: (id: string) => void;
  editPost: (id: string, schedulePost: SchedulePostTypes) => void;
  getIndividualPost: (id: string) => void;
}

const supabaseSchedule = createClient();

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
  createSchedulePost: async (newSchedulePostFormData: SchedulePostTypes) => {
    const { data, error } = await supabaseSchedule
      .from('schedule_posts')
      .insert([
        {
          title: newSchedulePostFormData.title,
          author: newSchedulePostFormData.author,
          scheduleImageUrl: newSchedulePostFormData.scheduleImageUrl,
          created_at: newSchedulePostFormData.created_at,
        },
      ]);
    if (data) {
      set((state) => ({
        schedulePosts: [...state.schedulePosts, newSchedulePostFormData],
      }));
    }
  },
  deletePost: async (id: string) => {
    const { data: postData, error: postError } = await supabaseSchedule
      .from('schedule_posts')
      .select('scheduleImageUrl')
      .eq('id', id)
      .single();

    if (postData && postData.scheduleImageUrl) {
      deleteScheduleImage({
        imageUrl: postData.scheduleImageUrl,
        table_name: 'schedule-post-images',
      });
    }

    const { data, error } = await supabaseSchedule
      .from('schedule_posts')
      .delete()
      .eq('id', id);

    if (data) {
      set((state) => ({
        schedulePosts: state.schedulePosts.filter((post) => post.id !== id),
      }));
    }
  },
  getIndividualPost: async (id: string) => {
    const { data, error } = await supabaseSchedule
      .from('schedule_posts')
      .select('*')
      .eq('id', id);
    if (data) {
      return data;
    }
  },
  editPost: async (id: string, schedulePost: SchedulePostTypes) => {
    const { data, error } = await supabaseSchedule
      .from('schedule_posts')
      .update({
        title: schedulePost.title,
        author: schedulePost.author,
        scheduleImageUrl: schedulePost.scheduleImageUrl,
      })
      .eq('id', id);
    if (data) {
      set((state) => ({
        schedulePosts: state.schedulePosts.map((post) =>
          post.id === id ? { ...post, ...schedulePost } : post
        ),
      }));
    }
  },
}));
