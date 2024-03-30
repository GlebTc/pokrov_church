import { create } from "zustand";

interface LanguageStore {
  language: string;
  setLanguage: (language: string) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "en",
  setLanguage: (language) => set({ language }),
  toggleLanguage: () => set((state) => ({
    language: state.language === "en" ? "ru" : "en",
  })),
}));
