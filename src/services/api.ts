import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://7ot7kaa6pl.execute-api.eu-north-1.amazonaws.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('idToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface Photo {
  photo_id: string;
  user_id: string;
  title: string;
  description: string;
  s3_key: string;
  upload_timestamp: string;
  vote_count: number;
  status: string;
  image_url?: string;
  voted?: boolean;
}

export interface Winner {
  month_year: string;
  photo_id: string;
  user_id: string;
  title: string;
  vote_count: number;
  calculated_at: string;
  s3_key: string;
  image_url?: string;
}

export interface AuthResponse {
  message: string;
  user_id?: string;
  token?: string;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
}

export const authAPI = {
  register: async (email: string, password: string, first_name: string, last_name: string): Promise<AuthResponse> => {
    const response = await api.post('/register', { email, password, first_name, last_name });
    return response.data;
  },

  confirmSignUp: async (email: string, code: string): Promise<AuthResponse> => {
    const response = await api.post('/verify', { email, code });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('idToken', response.data.token);
      localStorage.setItem('accessToken', response.data.access_token);
    }
    return response.data;
  },

  logout: async (): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        await api.post('/logout', {}, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  },
};

export const photoAPI = {
  getPhotos: async (userId: string): Promise<Photo[]> => {
    const response = await api.get(`/photos?user_id=${userId}`);
    return response.data;
  },

  getPublicPhotos: async (limit: number = 10): Promise<Photo[]> => {
    const response = await api.get(`/public-photos?limit=${limit}`);
    return response.data;
  },

  getPhoto: async (photoId: string): Promise<Photo> => {
    const response = await api.get(`/photos/${photoId}`);
    return response.data;
  },

  submitPhoto: async (userId: string, title: string, description: string, imageData: string): Promise<{ photo_id: string; message: string }> => {
    const response = await api.post('/submit-photo', {
      user_id: userId,
      title,
      description,
      image_data: imageData,
    });
    return response.data;
  },

  vote: async (userId: string, photoId: string): Promise<{ message: string }> => {
    const response = await api.post('/vote', { user_id: userId, photo_id: photoId });
    return response.data;
  },
};

export const winnerAPI = {
  getLastMonthWinner: async (): Promise<Winner> => {
    const response = await api.get('/winner/last-month');
    return response.data;
  },
};

export default api;

