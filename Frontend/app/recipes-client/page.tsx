"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import style from "styled-jsx/style";

type Recipe = {
  id: number;
  title?: string;
  cookingTime?: number | null;
  spicyLevel?: string;
  //calories?: number | null; // lägg till sen när backend har det
};

type SortMode = "title-asc" | "title-desc" | "time-asc" | "time-desc";

export default function RecipesClientPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("title-asc");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
   
   <main style={{padding:10}}>
      <h1 style={{ fontSize: 48, fontWeight: 700,  textAlign: "center",  }}>Foodassistent</h1>
      <h2 style={{ fontSize: 28,
         fontWeight: 600,
          textAlign: "left",
          fontStyle: "italic",
          transform:"rotate(-5deg)",
           marginBottom:20,
          animation: "pulse 2s ease-in-out infinite",
           display: "inline-block",
           marginLeft: 50,
            
              }}>Your digital recipe book!</h2>

      <div style={{ marginTop: 10, display: "flex", gap: 12, alignItems: "center" }}>
        <input
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 10, border: "1px solid #ff9900", borderRadius: 10, width: 320 }}
        />
        
        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value as SortMode)}
          style={{ padding: 10, border: "1px solid #ff9900", borderRadius: 10, }}
        >
          <option value="title-asc" style={{backgroundColor:"#282828"}}>Name A–Ö</option>
          <option value="title-desc" style={{backgroundColor:"#282828"}}>Name Ö–A</option>
          <option value="time-asc" style={{backgroundColor:"#282828"}}>Time (shortest first)</option>
          <option value="time-desc" style={{backgroundColor:"#282828"}}>Time (longest first)</option>
          <option value="Calories-asc" style={{backgroundColor:"#282828"}}>Calories (Low to high)</option>
          <option value="Calories-desc" style={{backgroundColor:"#282828"}}>Calories (High to low)</option>
        </select>

        <button
          onClick={() => {
            setQuery("");
            setSortMode("title-asc");
          }}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ff9900" }}
       >
          Reset
        </button>
          
          
          
        
        
      </div>
     
     <div style ={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
      <Link href="/recipes-new" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ff9900" }}>Create new recipe</Link>
      <Link href="/recipes-delete" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ff9900" }}>Delete recipe</Link>
      <Link href="/recipes" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ff9900" }}>View all info about recipes</Link>
      <Link href="/recipes/update" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ff9900" }}>Update recipe</Link>
    </div>
     
      <p style={{ marginTop: 12 }}>
         Preview of avalible recipes: {visible.length}
      </p>
      
      {error && <p style={{ marginTop: 12 }}>❌ {error}</p>}

      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
        {visible.map((r) => (
          <div key={r.id} style={{ border: "1px solid #ff9900", borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{r.title}</div>
            <div>Cooking time: {r.cookingTime ?? "-"} min</div>
            <div>Spicy Level: {r.spicyLevel ?? "-"}</div>
          </div>
        ))}
      </div>
    </main>
  </>
);
}
