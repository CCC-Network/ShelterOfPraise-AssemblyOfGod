// src/pages/types.ts

export interface Message {
  id: number;
  name: string;
  image: string;  // URL string for the image
  message: string;
  date?: string;  // Optional date field
}

export interface MessageFormState {
  name: string;
  image: File | null;
  imagePreview: string;
  message: string;
  date: string;
}

export interface MemorialProfile {
  id: number;
  name: string;
  image: string;
  birthDate: string;
  deathDate: string;
  quote: string;
  role: string;
  stories: Array<{
    title: string;
    content: string;
    image: string;
  }>;
  photos: string[];
  videos: Array<{
    title: string;
    thumbnail: string;
  }>;
}

export interface Story {
  title: string;
  content: string;
  image: string;
}

export interface Video {
  title: string;
  thumbnail: string;
}