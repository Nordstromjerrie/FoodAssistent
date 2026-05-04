"use client";
import { useState } from "react";
import type { Recipe } from "@/types/recipe";

export default function UpdateRecipe({
  recipe,
  onUpdated,
}: {
  recipe: Recipe;
  onUpdated: (updated: Recipe) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [instructions, setInstructions] = useState(recipe.instructions ?? "");
  const [calories, setCalories] = useState(recipe.calories ?? 0);
  const [title, setTitle] = useState(recipe.title);
  const [cookingTime, setCookingTime] = useState(recipe.cookingTime ?? 0);
  const [spicyLevel, setSpicyLevel] = useState(recipe.spicyLevel ?? "");
  const [difficulty, setDifficulty] = useState(recipe.difficulty ?? "");
  const [mealType, setMealType] = useState(recipe.mealType ?? "");

  const updateRecipe = async () => {
    const res = await fetch(
      `http://localhost:8080/recipe/${recipe.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          cookingTime,
          spicyLevel,
          instructions,
          calories,
          difficulty,
          mealType,
        }),
      }
    );

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    const updated: Recipe = {
      ...recipe,
      title,
      cookingTime,
      spicyLevel,
      instructions,
      calories,
      difficulty,
      mealType,
    };

    onUpdated(updated);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-400"
      >
        Update
      </button>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black p-5 rounded-xl border-2 border-orange-500 w-[320px] max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-orange-500 text-lg mb-4">
              Update Recipe
            </h3>

            {/* TITLE */}
            <div className="mb-3">
              <label className="block text-sm text-gray-300 mb-1">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
              />
            </div>

            {/* COOKING TIME */}
            <div className="mb-3">
              <label className="block text-sm text-gray-300 mb-1">
                Cooking Time (minutes)
              </label>
              <input
                type="number"
                value={cookingTime}
                onChange={(e) => setCookingTime(Number(e.target.value))}
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
              />
            </div>

            {/* SPICY LEVEL */}
            <div className="mb-3">
              <label className="block text-sm text-gray-300 mb-1">
                Spicy Level
              </label>
              <select
                value={spicyLevel}
                onChange={(e) => setSpicyLevel(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
              >
                <option value="">Select spicy level</option>
                <option value="MILD">MILD</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HOT">HOT</option>
              </select>
            </div>

            {/* INSTRUCTIONS */}
            <div className="mb-3">
              <label className="block text-sm text-gray-300 mb-1">
                Instructions
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 resize-none"
              />
            </div>

            {/* CALORIES */}
            <div className="mb-3">
              <label className="block text-sm text-gray-300 mb-1">
                Calories
              </label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
              />
            </div>

            {/* DIFFICULTY */}
            <div className="mb-3">
              <label className="block text-sm text-gray-300 mb-1">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
              >
                <option value="">Select difficulty</option>
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>

            {/* MEAL TYPE */}
            <div className="mb-3">
              <label className="block text-sm text-gray-300 mb-1">
                Meal Type
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
              >
                <option value="">Select meal type</option>
                <option value="BREAKFAST">BREAKFAST</option>
                <option value="LUNCH">LUNCH</option>
                <option value="DINNER">DINNER</option>
                <option value="SNACK">SNACK</option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="sticky bottom-0 bg-black pt-3 flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={updateRecipe}
                className="flex-1 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-400"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}