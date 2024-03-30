import { create } from "zustand";
import axios from "axios";
import { NewsType } from "@/src/app/utils/types/newsTypes";
import { createClient } from '@supabase/supabase-js';

interface NewsStoreProps {
    news: NewsType[];
    fetchNews: () => void;
}

const supabaseNews = createClient<NewsType>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );


export const useNewsStore = create<NewsStoreProps>((set) => ({
    news: [],
    fetchNews: async () => {
        const { data: news, error } = await supabaseNews.from('News').select('*');
        if (news) {
            set({ news });
        }
    },
}));