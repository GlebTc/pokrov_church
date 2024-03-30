import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

interface UserStoreProps {
  user: User | null;
  signInUser: (user: User) => void;
  isLoading?: boolean;
}

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const useUserStore = create<UserStoreProps>((set) => ({
  user: null,
  isLoading: true,
    signInUser: async (user) => {
        set({ user });
    },
}));
