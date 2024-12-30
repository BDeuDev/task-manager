"use client";

import { useState } from "react";
import { userService } from "@/services/userService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const setAccessToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const user = await userService.login({ email, password });
      
      if (user) {
        document.cookie = `access_token=${user.access_token}; path=/; secure; samesite=strict`;
        setAccessToken(`Bearer ${user.access_token}`);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "Las credenciales ingresadas no son válidas"
      );
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#F7F6F2]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-[#4A4A4A] mb-6">Iniciar Sesión</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-blue-500 hover:text-blue-600">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
} 