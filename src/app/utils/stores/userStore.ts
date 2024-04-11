import { create } from 'zustand';
import { User, UserAttributes } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

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
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error signing in:', error.message);
      return;
    }
    if (data) {
      set({ user: data.user });
    }
  },
  signOutUser: async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
