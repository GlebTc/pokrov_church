export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface NewsType {
  id: string;
  created_at: string;
  title: string;
  author: string;
  content: string;
  imageUrl: string;
}
