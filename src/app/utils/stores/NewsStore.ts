import { create } from 'zustand';
import { NewsType } from '@/src/app/utils/types/newsTypes';
import { createClient } from '@supabase/supabase-js';

interface NewsStoreProps {
  news: NewsType[];
  fetchNews: () => void;
  isLoading?: boolean;
  createNewsPost: (newsPost: NewsType) => void;
  deletePost: (id: string) => void;
  editPost: (id: string, newsPost: NewsType) => void;
  getIndividualPost: (id: string) => void;
}

const supabaseNews = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const useNewsStore = create<NewsStoreProps>((set) => ({
  news: [],
  isLoading: true,
  fetchNews: async () => {
    const { data: news, error } = await supabaseNews.from('news_posts').select('*');
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
        imageUrl: newsPost.imageUrl,
        created_at: newsPost.created_at,
      },
    ]);

    if (data) {
      set({ news: [...data] });
    }
  },
  deletePost: async (id) => {
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
        imageUrl: newsPost.imageUrl,
      })
      .eq('id', id);
    if (data) {
      set({ news: [...data] });
    }
  },
  getIndividualPost: async (id) => {
    const { data, error } = await supabaseNews.from('news_posts').select('*').eq('id', id);
    if (data) {
      set({ news: [...data] });
    }
  }
}));
