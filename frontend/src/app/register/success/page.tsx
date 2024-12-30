import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#F7F6F2]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-[#4A4A4A] mb-4">
          ¡Registro Exitoso!
        </h1>
        <p className="text-gray-600 mb-6">
          Tu cuenta ha sido creada correctamente.
        </p>
        <Link
          href="/login"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Ir al Login
        </Link>
      </div>
    </main>
  );
} 