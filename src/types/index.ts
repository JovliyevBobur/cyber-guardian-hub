/**
 * Application-wide type definitions
 */

export type Language = 'uz' | 'en' | 'ru';
export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  readTime: string;
  views: number;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  views: number;
  rating: number;
  createdAt: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  questions: number;
  time: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  participants: number;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  players: number;
  rating: number;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NavLink {
  path: string;
  label: string;
}

