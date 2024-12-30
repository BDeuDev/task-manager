import TaskList from "./components/taskList";
import LogoutButton from "@/components/ui/LogoutButton";
import { AnimatePresence } from "framer-motion";

export default function Dashboard() {

    return (
      <main className="flex flex-col items-center justify-start min-h-screen bg-[#F7F6F2] gap-4">
        <div className="flex flex-col text-center items-center justify-center gap-4  h-[200px]">
          <div>
          <h1 className="text-4xl text-[#4A4A4A] font-bold w-full h-full">Bienvenido a tu dashboard</h1>
          </div>

            <LogoutButton />

        </div>
        <AnimatePresence>
            <TaskList />
        </AnimatePresence>
      </main>
    )
  }