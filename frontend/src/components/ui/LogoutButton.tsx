'use client'
import { LogOutIcon } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
  const removeToken = useAuthStore((state) => state.removeToken);
  const handleLogout = async () => {
    try {
      removeToken();
      document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
    return (
          <div>
            <button onClick={handleLogout} className="flex flex-row items-center gap-2">
                Cerrar sesión
              <LogOutIcon />
            </button>
          </div>
    )
  }