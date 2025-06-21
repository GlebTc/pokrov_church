import { create } from 'zustand';
import { User, UserAttributes } from '@supabase/supabase-js';
import { createClient } from '@/src/app/utils/supabase';

interface UserStoreProps {
  user: UserAttributes | null;
  signInUser: (user: UserAttributes) => void;
  signOutUser: () => void;
  isLoading?: boolean;
}

export const useUserStore = create<UserStoreProps>((set) => ({
  user: null,
  isLoading: true,
  signInUser: async (loginCredentials: UserAttributes) => {
    const { email, password } = loginCredentials || { email: '', password: '' }; // Default values
    if (!email || !password) {
      console.error('Email and password are required.');
      return;
    }
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error signing in:', error.message);
      return;
    }
    if (data) {
      set({ user: data.user });
    }
  },
  signOutUser: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
