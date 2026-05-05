"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AddRecipe from "@/components/AddRecipe";
import DeleteRecipe from "@/components/DeleteRecipe";
import UpdateRecipe from "@/components/UpdateRecipe";
import style from "styled-jsx/style";
import type { Recipe } from "@/types/recipe";


type SortMode = "title-asc" | "title-desc" | "time-asc" | "time-desc";

export default function RecipesClientPage() {
  // Lägg till denna funktion i RecipesClientPage
const deleteRecipe = async (id: number) => {
  if (!confirm("Är du säker på att du vill ta bort receptet?")) return;
  const res = await fetch(`http://localhost:8080/recipe/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    alert("Delete misslyckades: " + res.statusText);
    return;
  }
  setRecipes((prev) => prev.filter((r) => r.id !== id));
};
  const [showAdd, setShowAdd] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("title-asc");
  const [error, setError] = useState<string | null>(null);

  async function loadRecipes() {
    try {
      setError(null);
      const res = await fetch("http://localhost:8080/recipe/get/all/recipes");
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const data = await res.json();
      setRecipes(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to fetch");
    }
  }
  useEffect(() => {
    loadRecipes();
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1) filter
    const filtered = recipes.filter((r) => {
      const title = (r.title ?? "").toLowerCase();
      return q === "" ? true : title.includes(q);
    });

    // 2) sort
    const sorted = [...filtered].sort((a, b) => {
      const at = a.title ?? "";
      const bt = b.title ?? "";

      if (sortMode === "title-asc") return at.localeCompare(bt);
      if (sortMode === "title-desc") return bt.localeCompare(at);

      const aTime = a.cookingTime ?? 999999;
      const bTime = b.cookingTime ?? 999999;

      if (sortMode === "time-asc") return aTime - bTime;
      return bTime - aTime; // time-desc
    });

    return sorted;
  }, [recipes, query, sortMode]);

  return (
  <>
    <style>{`
      @keyframes pulse {
        0% { transform: rotate(-5deg) scale(1); }
        50% { transform: rotate(-5deg) scale(1.05); }
        100% { transform: rotate(-5deg) scale(1); }
        }
      `}
      </style>
   
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: "url('/FoodAssistenlogo.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -2
    
    }} />
    <div style={{
      position: "fixed",
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: -1,
    }}
     />
   
   <main className= "p-4">
      <h1 className= " text-5xl font-bold text-center text-white">Foodassistent</h1>"
     <h2 className="text-3xl font-semibold text-left .italic mb-8 ml-12 -rotate-5 animate-pulse inline-block ml-12 ">Your digital recipe book!</h2>
      
        
      <div  className="p-2 flex gap-3 object-center justify-left">        
      <input
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-lg border border-yellow-600"        />
        {/* className="p-4 ¨rounded-sm orange " */}
        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value as SortMode)}
          className="px-3 rounded-lg border border-yellow-600"
        >
          <option value="title-asc" className="bg-black">Name A–Ö</option>
          <option value="title-desc" className="bg-black">Name Ö–A</option>
          <option value="time-asc" className="bg-black">Time (shortest first)</option>
          <option value="time-desc" className="bg-black">Time (longest first)</option>
          <option value="Calories-asc" className="bg-black">Calories (Low to high)</option>
          <option value="Calories-desc"className="bg-black">Calories (High to low)</option>
        </select>

        <button
          onClick={() => setShowAdd(true)}
          className="px-3 rounded-lg border border-yellow-600"
       >
          Create new Recipe
        </button>
          
      </div>
     {/* className= "mt-4 flex gap-3 justify-center"*/}
     <div className= "mt-4 flex gap-3 justify-left">
      <Link href="/recipes" className="p-2 rounded-lg border border-yellow-600">View all recipes</Link>
    </div>
      
      {error && <p className="mt-3">❌ {error}</p>}

      <div className= "mt-4 gap-3 grid">
        {visible.map((r) => (
  <div
    key={r.id}
    className="border border-yellow-600 rounded-lg p-4"
 
  >
     
    <div className="text-lg font-semibold">{r.title}</div>
    <div>Cooking time: {r.cookingTime ?? "-"} min</div>
    <div>Spicy Level: {r.spicyLevel ?? "-"}</div>

    {/* KNAPPAR */}
    <div className="flex gap-2 mt-2">
    
      {/* DELETE */}
      <button
        onClick={() => deleteRecipe(r.id)}
        className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
        >Delete</button>

      {/* UPDATE 👇 HÄR */}
      <UpdateRecipe
        recipe={r}
        onUpdated={(updated) => {
          setRecipes((prev) =>
            prev.map((item) =>
              item.id === updated.id ? updated : item
            )
          );
        }}
      />
    </div>
  </div>
))}
        
      </div>
      {showAdd && (
    <div
    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    onClick={() => setShowAdd(false)}
  >
    <div
      className="bg-[#141416] p-5 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <AddRecipe onClose={() => setShowAdd(false)} 
        onSuccess={()=> {
          loadRecipes();
          setShowAdd(false);
        }}/>
    </div>
  </div>
)}
    </main>
  </>
);
}
