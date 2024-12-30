import axios from 'axios';
import { User, LoginUser } from '@/types/user';

export const userService = {
  register: async (user: User): Promise<User> => {
    try {
      const { data } = await axios.post('http://localhost:3001/auth/register', user);
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },
  login: async (user: User): Promise<LoginUser> => {
    try {
      const { data } = await axios.post('http://localhost:3001/auth/login', user);
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
  
}; 