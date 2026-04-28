"use client";
import { useState } from "react";

type Recipe = {
  id: number;
  title: string;
  cookingTime?: number | null;
  spicyLevel?: string;
  instructions?: string;
  calories?: number | null;
};

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
  const [cookingTime, setCookingTime] = useState(
    recipe.cookingTime ?? 0
  );
  // const [spicyLevel, setSpicyLevel] = useState(
  //   recipe.spicyLevel ?? ""
  // );
const [spicyLevel, setSpicyLevel] = useState(() => {
  console.log("spicyLevel från backend:", recipe.spicyLevel);
  return recipe.spicyLevel ?? "";
});
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
        }),
      }
    );
    console.log({
    title,
    cookingTime,
    spicyLevel,
    instructions,
    calories,
  });

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
    };
    onUpdated(updated);
    setShowModal(false);
  
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Update
      </button>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "black",
              padding: 20,
              borderRadius: 12,
              border: "2px solid orange",
              width: 300,
            }}
          >
            <h3 style={{
              color:"orange",
            }
            }>Update Recipe</h3>

            {/* TITLE */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              style={{ width: "100%", marginBottom: 10 }}
            />

            {/* COOKING TIME */}
            <input
              type="number"
              value={cookingTime}
              onChange={(e) => setCookingTime(Number(e.target.value))}
              placeholder="Cooking time (min)"
              style={{ width: "100%", marginBottom: 10 }}
            />

            {/* SPICY LEVEL */}
            <select
  value={spicyLevel}
  onChange={(e) => setSpicyLevel(e.target.value)}
  style={{ width: "100%", marginBottom: 10 }}
>
  <option value="">Select spicy level</option>
  <option value="MILD">MILD</option>
  <option value="MEDIUM">MEDIUM</option>
  <option value="HOT">HOT</option>
</select>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button onClick={updateRecipe}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}