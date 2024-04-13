import { create } from 'zustand';
import { NewsPostTypes } from '@/src/app/utils/types/newsPostTypes';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface NewsPostsStoreProps {
  news: NewsPostTypes[];
  fetchNews: () => void;
  isLoading?: boolean;
  createNewsPost: (newsPost: NewsPostTypes) => void;
  deleteNewsPost: (id: string) => void;
  editPost: (id: string, newsPost: NewsPostTypes) => void;
  getIndividualNewsPost: (id: string) => void;
}

const supabaseNews = createClientComponentClient();

export const useNewsPostsStore = create<NewsPostsStoreProps>((set) => ({
  news: [],
  isLoading: true,
  fetchNews: async () => {
    const { data: news, error } = await supabaseNews
      .from('news_posts')
      .select('*');
    if (news) {
      set({ news });
      set({ isLoading: false });
    }
  },
  createNewsPost: async (newsPost) => {
    const { data, error } = await supabaseNews.from('news_posts').insert([
      {
        title: newsPost.title,
        content: newsPost.content,
        author: newsPost.author,
        newsImageUrl: newsPost.newsImageUrl,
        created_at: newsPost.created_at,
      },
    ]);

    if (data) {
      set({ news: [...data] });
    }
  },
  deleteNewsPost: async (id) => {
    const { data: postData, error: postError } = await supabaseNews
      .from('news_posts')
      .select('newsImageUrl')
      .eq('id', id)
      .single();

    if (postData && postData.newsImageUrl) {
      const { data, error } = await supabaseNews.storage
        .from('news_post_images')
        .remove([postData.newsImageUrl.split('/').pop()]);
    }

    const { data, error } = await supabaseNews
      .from('news_posts')
      .delete()
      .eq('id', id);

    if (data) {
      set({ news: [...data] });
    }
  },
  editPost: async (id, newsPost) => {
    const { data, error } = await supabaseNews
      .from('news_posts')
      .update({
        title: newsPost.title,
        author: newsPost.author,
        content: newsPost.content,
        newsImageUrl: newsPost.newsImageUrl,
      })
      .eq('id', id);
    if (data) {
      set({ news: [...data] });
    }
  },
  getIndividualNewsPost: async (id) => {
    const { data, error } = await supabaseNews
      .from('news_posts')
      .select('*')
      .eq('id', id);
    if (data) {
      set({ news: [...data] });
    }
  },
}));
