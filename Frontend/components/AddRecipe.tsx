"use client";
import { useState } from "react";

export default function AddRecipe({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    cookingTime: 1,
    difficulty: "EASY",
    spicyLevel: "MILD",
    imageUrl: "",
    calories: 0,
    mealType: "OTHER",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      const payload = {
        title: formData.title,
        instructions: formData.instructions,
        cookingTime: Number(formData.cookingTime),
        difficulty: formData.difficulty,
        spicyLevel: formData.spicyLevel,
        imageUrl: formData.imageUrl,
        calories: Number(formData.calories),
        mealType: formData.mealType,
      };

    const res = await fetch("http://localhost:8080/recipe/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
});

    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", text);

    if (!res.ok) {
    throw new Error(text);
}

      setStatus({
        loading: false,
        error: "",
        success: "Recipe created successfully!",
      });
    } catch (err: any) {
    console.error("CREATE ERROR:", err);

    setStatus({
        loading: false,
        error: err.message ?? "Failed to create recipe",
        success: ""
    });
}
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      {/* Close button */}
      <button
        onClick={onClose}
        className="float-right px-3 py-1 border border-orange-400 rounded-lg hover:bg-orange-100 transition"
      >
        X
      </button>

      {/* Title */}
      <div className="flex justify-center mb-6">
        <h1 className="border-2 border-orange-400 rounded-xl text-xl font-light px-10 py-3 text-center">
          New Recipe
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-light">Recipe Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter recipe title"
            className="p-2 border border-orange-400 rounded-lg w-full"
          />
        </div>

        {/* Instructions */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-light">Instructions:</label>
          <textarea
            rows={6}
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Enter recipe instructions"
            className="p-2 border border-orange-400 rounded-lg w-full"
          />
        </div>

        {/* Cooking time */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-light">
            Cooking Time (minutes):
          </label>
          <input
            type="number"
            name="cookingTime"
            min={1}
            value={formData.cookingTime}
            onChange={handleChange}
            className="p-2 border border-orange-400 rounded-lg w-full"
          />
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-light">Difficulty:</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="p-2 border border-orange-400 rounded-lg bg-black"
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        {/* Spicy */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-light">Spicy Level:</label>
          <select
            name="spicyLevel"
            value={formData.spicyLevel}
            onChange={handleChange}
            className="p-2 border border-orange-400 rounded-lg bg-black"
          >
            <option value="MILD">Mild</option>
            <option value="MEDIUM">Medium</option>
            <option value="HOT">Hot</option>
          </select>
        </div>

        {/* Meal type */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-light">Meal Type:</label>
          <select
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            className="p-2 border border-orange-400 rounded-lg bg-black"
          >
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-light">Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Optional"
            className="p-2 border border-orange-400 rounded-lg w-full"
          />
        </div>

        {/* Calories */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-light">kcal/100g:</label>
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            placeholder="Optional"
            className="p-2 border border-orange-400 rounded-lg w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status.loading}
          className="mt-4 p-2 border border-orange-400 rounded-lg hover:bg-orange-100 transition disabled:opacity-50"
        >
          Save Recipe
        </button>
      </form>

      {/* Status */}
      {status.error && (
        <p className="text-red-500 mt-3">{status.error}</p>
      )}
      {status.success && (
        <p className="text-green-500 mt-3">{status.success}</p>
      )}
    </main>
  );
}