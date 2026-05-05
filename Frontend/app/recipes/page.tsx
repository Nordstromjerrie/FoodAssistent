"use client";

import { useEffect, useState } from "react";
import DeleteRecipe from "@/components/DeleteRecipe";
import UpdateRecipe from "@/components/UpdateRecipe";
import type { Recipe } from "@/types/recipe";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      
      try {
        const res = await fetch(
          "http://localhost:8080/recipe/get/all/recipes"
        );

        if (!res.ok) throw new Error("Failed to fetch recipes");

        const data = await res.json();
        setRecipes(data);
        console.log(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      
    };

    fetchRecipes();
  }, []);

  const handleDelete = (id: number) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-400">
        Loading recipes...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {error}
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">
        Recipes
      </h1>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <div
            key={r.id}
            className="border border-orange-400 rounded-xl p-4 bg-[#121212] shadow-md hover:scale-[1.01] transition"
          >
            {/* IMAGE */}
            <img 
              src={r.imageUrl}
              className=" h-32 w-full object-cover object-bottom rounded-lg mb-3"
            />

            {/* TITLE */}
            <div className="text-lg font-semibold text-orange-400">
              {r.title}
            </div>

            {/* INFO */}
            <div className="text-sm text-gray-300 mt-2 space-y-1">
              <div>Difficulty: {r.difficulty}</div>
              <div>Spicy Level: {r.spicyLevel}</div>
              <div>
                Cooking time: {r.cookingTime ?? "-"} min
              </div>
              <div>Calories: {r.calories ?? "-"}</div>
              <div>Meal Type: {r.mealType}</div>
            </div>

            <div className="text-sm text-gray-400 mt-2 line-clamp-3">
              {r.instructions}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-4">
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