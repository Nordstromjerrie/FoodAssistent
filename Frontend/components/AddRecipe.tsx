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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
        success: "",
      });
    }
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="relative flex justify-center mb-6">
        <h1 className="text-2xl font-semibold text-white/90 animate-fade-in">
          New Recipe
        </h1>

        <button
          onClick={onClose}
          className="absolute right-0 px-2 py-1 rounded-md bg-[#1a1a1d] text-white border border-white/10 hover:bg-white/10 transition"
        >
          X
        </button>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-base text-gray-300">
            Recipe Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter recipe title"
            className="p-2 rounded-lg w-full bg-[#1a1a1d] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition"
          />
        </div>

        {/* Instructions */}
        <div className="flex flex-col gap-2">
          <label htmlFor="instructions" className="text-base text-gray-300">
            Instructions:
          </label>
          <textarea
            id="instructions"
            name="instructions"
            rows={12}
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Enter recipe instructions"
            className="p-2 rounded-lg w-full bg-[#1a1a1d] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition resize-none"
          />
        </div>

        {/* Cooking time */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cooking time" className="text-base text-gray-300">
            Cooking time(minutes):
          </label>
          <input
            id="cooking time"
            type="number"
            name="cookingTime"
            min={1}
            value={formData.cookingTime}
            onChange={handleChange}
            className="p-2 rounded-lg w-full bg-[#1a1a1d] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition"
          />
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-2">
          <label htmlFor="difficulty" className="text-base text-gray-300">
            Difficulty:
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="p-2 rounded-lg w-full bg-[#1a1a1d] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition"
          >
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
        </div>

        {/* Spicy */}
        <div className="flex flex-col gap-2">
          <label htmlFor="spicy-level" className="text-base text-gray-300">
            Spicy-level:
          </label>
          <select
            id="spicy-level"
            name="spicyLevel"
            value={formData.spicyLevel}
            onChange={handleChange}
            className="p-2 rounded-lg w-full bg-[#1a1a1d] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition"
          >
            <option value="MILD">Mild</option>
            <option value="MEDIUM">Medium</option>
            <option value="HOT">Hot</option>
          </select>
        </div>

        {/* Meal type */}
        <div className="flex flex-col gap-2">
          <label htmlFor="meal type" className="text-base text-gray-300">
            Meal type:
          </label>
          <select
            id="meal type"
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            className="p-2 rounded-lg w-full bg-[#1a1a1d] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition"
          >
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-2">
          <label htmlFor="imageurl" className="text-base text-gray-300">
            Imageurl:
          </label>
          <input
            id="imageurl"
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Optional"
            className="p-2 rounded-lg w-full bg-[#1a1a1d] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition"
          />
        </div>

        {/* Calories */}
        <div className="flex flex-col gap-2">
          <label htmlFor="kcal/100g" className="text-base text-gray-300">
            Kcal/100g:
          </label>
          <input
            id="kcal/100g"
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            placeholder="Optional"
            className="p-2 rounded-lg w-full bg-[#1a1a1d] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status.loading}
          className="mt-4 w-full px-5 py-3 rounded-md bg-[#1a1a1d] text-sm text-white border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          Save Recipe
        </button>
      </form>

      {/* Status */}
      {status.error && <p className="text-red-500 mt-3">{status.error}</p>}
      {status.success && (
        <p className="text-green-500 mt-3">{status.success}</p>
      )}
    </main>
  );
}
