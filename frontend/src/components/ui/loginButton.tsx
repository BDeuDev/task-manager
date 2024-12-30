'use client'
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const button = e.currentTarget;
    button.classList.add('animate-shake');
    setTimeout(() => {
        window.location.href = '/login';
    }, 300);
};

export default function LoginButton() {
    return (
        <Link 
            href="/login" 
            onClick={handleClick}
        >
            <button className="bg-[#FFB6B9] text-white px-4 py-2 rounded-md shadow-lg hover:gap-3 gap-0 transition-all duration-300 hover:bg-[#FF6B6B] flex items-center ">
                Login
                <ArrowRight className="w-4 h-4" />
            </button>
        </Link>
    )
}