import LoginButton from "@/components/ui/loginButton";
import RegisterButton from "@/components/ui/RegisterButton";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#F7F6F2] gap-4">
      <h1 className="text-4xl text-[#4A4A4A] font-bold">Task Manager</h1>
      <div className="flex flex-row gap-8">
        <RegisterButton />
        <LoginButton />
      </div>
    </main>
  );
}
