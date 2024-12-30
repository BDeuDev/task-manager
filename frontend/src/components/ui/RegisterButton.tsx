import Link from "next/link";

export default function RegisterButton() {
    return (
      <Link href="/register">
        <button className="bg-[#8ECAE6] text-white px-4 py-2 rounded-md shadow-lg hover:bg-[#6495ED] transition-colors duration-300">
          Register
        </button>
      </Link>
    )
  }