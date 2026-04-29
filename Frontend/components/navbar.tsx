"use client";
import Link from "next/link";

export default function navbar() {
  return (
    <nav className="bg-black border-b border-orange-400 px-6 py-4 flex justify-between items-center">
      
      {/* LOGO */}
      <div className="text-orange-400 text-x1 font-bold">
        Food Assistant
      </div>

      {/* LINKS */}
      <div className="flex gap-6">
        

        <Link href="/recipes-client" className="text-orange-400 hover:text-orange-400">
          Search recipes 
        </Link>

        <Link href="/recipes" className="text-orange-400 hover:text-orange-400">
          All recipes 
        </Link>
      </div>
    </nav>
  );
}