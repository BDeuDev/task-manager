import axios from 'axios';
import { Task, NewTask, EditTask } from "@/types/task";
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().access_token;
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    try {
      const { data } = await api.get('/api/tasks');
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },
  createTask: async (task: NewTask): Promise<Task> => {
    try {
      const { data } = await api.post('/api/tasks', task);
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },
  completeTask: async (taskId: number | string): Promise<Task> => {
    try {
      const { data } = await api.put(`/api/tasks/${taskId}`, { completed: true });
      return data;
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  },
  unCompleteTask: async (taskId: number | string): Promise<Task> => {
    try {
      const { data } = await api.put(`/api/tasks/${taskId}`, { completed: false });
      return data;
    } catch (error) {
      console.error('Error uncompleting task:', error);
      throw error;
    }
  },
  updateTask: async (taskId: number | string, task: EditTask): Promise<Task> => {
    try {
      const { data } = await api.put(`/api/tasks/${taskId}`, task);
      return data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },
  deleteTask: async (taskId: number | string): Promise<Task> => {
    try {
      const { data } = await api.delete(`/api/tasks/${taskId}`);
      return data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}; 