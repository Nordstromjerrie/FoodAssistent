"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Recipe = {
  id: number;
  title: string;
};

export default function DeleteRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/recipe/get/all/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => {
        console.error("Failed to load recipes:", err);
      });
  }, []);

  const deleteRecipe = async (id: number) => {
    if (!confirm("Är du säker på att du vill ta bort receptet?")) return;

    const res = await fetch(`http://localhost:8080/recipe/delete/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      alert("Delete misslyckades: " + (text || res.statusText));
      return;
    }

    // Uppdatera UI direkt
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 20,
        marginTop: 100,
      }}
    >
        <div>
        {recipes.map((r) => (
  <div
    key={r.id}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
      width: "100%",
      border: "1px solid orange", // 👈 gör varje rad tydlig
      padding: 8,
      borderRadius: 6,
    }}
  >
    <span>{r.title}</span> {/* 👈 DU SAKNAR DENNA */}

    <button
      onClick={() => deleteRecipe(r.id)}
      style={{
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "4px 8px",
        cursor: "pointer",
        borderRadius: 4,
      }}
    >
      Delete
    </button>
  </div>
))}

        {recipes.length === 0 && <p>Inga recept hittades.</p>}
      </div>
    </div>
  );
}