import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  access_token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      access_token: null,
      setToken: (token: string) => set({ access_token: token }),
      removeToken: () => set({ access_token: null })
    }),
    {
      name: 'auth-storage',
    }
  )
) 