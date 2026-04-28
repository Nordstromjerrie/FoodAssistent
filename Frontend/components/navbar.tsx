"use client";
import Link from "next/link";

export default function navbar() {
  return (
    <nav className="bg-black border-b border-orange-500 px-6 py-4 flex justify-between items-center">
      
      {/* LOGO */}
      <div className="text-white text-xl font-bold">
        FoodAssistant
      </div>

      {/* LINKS */}
      <div className="flex gap-6">
        

        <Link href="/recipes-client" className="text-white hover:text-orange-400">
          Search recipes 
        </Link>

        <Link href="/recipes" className="text-white hover:text-orange-400">
          All recipes 
        </Link>
      </div>
    </nav>
  );
}