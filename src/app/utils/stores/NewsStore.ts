import { create } from 'zustand';
import axios from 'axios';
import { NewsType } from '@/src/app/utils/types/newsTypes';
import { createClient } from '@supabase/supabase-js';

interface NewsStoreProps {
  news: NewsType[];
  fetchNews: () => void;
  isLoading?: boolean;
  createNewsPost: (newsPost: NewsType) => void;
}

const supabaseNews = createClient<NewsType>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const useNewsStore = create<NewsStoreProps>((set) => ({
  news: [],
  isLoading: true,
  fetchNews: async () => {
    const { data: news, error } = await supabaseNews.from('News').select('*');
    if (news) {
      set({ news });
      set({ isLoading: false });
    }
  },
  createNewsPost: async (newsPost) => {
    const { data, error } = await supabaseNews.from('News').insert([
      {
        title: newsPost.title,
        content: newsPost.content,
        author: newsPost.author,
        imageUrl: newsPost.imageUrl,
      },
    ]);

    if (data) {
      set({ news: [...data] });
    }
  },
}));
