"use client";
import type { Recipe } from "@/types/recipe";

type Props = {
  id: number;
  onDeleted: (id: number) => void;
};

export default function DeleteRecipe({ id, onDeleted }: Props) {
  const handleDelete = async () => {
    if (!confirm("Är du säker på att du vill ta bort receptet?")) return;

    const res = await fetch(
      `http://localhost:8080/recipe/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      alert("Delete misslyckades: " + (text || res.statusText));
      return;
    }

    // Uppdatera parent state
    onDeleted(id);
  };

  return (
    <button
      onClick={handleDelete}
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
  );
}