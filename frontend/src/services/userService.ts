import axios from 'axios';
import { User, LoginUser } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export const userService = {
  register: async (user: User): Promise<User> => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, user);
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },
  login: async (user: User): Promise<LoginUser> => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, user);
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
}; 