"use client";

import { useEffect, useState } from "react";
import DeleteRecipe from "@/components/DeleteRecipe";
import UpdateRecipe from "@/components/UpdateRecipe";
import type { Recipe } from "@/types/recipe";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hämta data
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/recipe/get/all/recipes"
        );

        if (!res.ok) throw new Error("Failed to fetch recipes");

        const data = await res.json();
        setRecipes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // DELETE (uppdaterar state direkt)
  const handleDelete = (id: number) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Recipes</h1>

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {recipes.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ff9500",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <img
              src={r.imageUrl}
              style={{
                height: 80,
                width: "15%",
                borderRadius: 12,
              }}
            />

            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {r.title}
            </div>

            <div>Difficulty: {r.difficulty}</div>
            <div>Spicy Level: {r.spicyLevel}</div>
            <div>Cooking time: {r.cookingTime ?? "-"} min</div>
            <div>Calories: {r.calories ?? "-"}</div>
            <div>Instructions: {r.instructions}</div>
            <div>Meal Type: {r.mealType}</div>

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <DeleteRecipe
                id={r.id}
                onDeleted={handleDelete}
              />

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
    </main>
  );
}