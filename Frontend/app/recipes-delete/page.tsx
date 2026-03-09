"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Recipe = { id: number; title: string };

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedId, setSelectedId] = useState<number | "">("");
  const [showModal, setShowModal] = useState(false); {/* ----- */}
  useEffect(() => {
    fetch("http://localhost:8080/recipe/get/all/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  const deleteSelected = async () => {
    if (selectedId === "") return;
    const id = selectedId;

    const res = await fetch(`http://localhost:8080/recipe/delete/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      alert("Delete misslyckades: " + (text || res.statusText));
      return;
    }

    // Success: uppdatera UI
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    setSelectedId("");
  };

 return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
      marginTop: 100,
    }}
  >
    <div style={{ border: "2px solid orange", padding: 10, borderRadius: 10, width: "20%", textAlign: "center" }}>
      <Link
        href="/recipes-client"
        style={{
          fontSize: 22,
          fontWeight: 700,
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Return to recipes
      </Link>
    </div>

    <div style={{ border: "2px solid orange", padding: 10, borderRadius: 10, width: "20%" }}>
      {recipes.map((r) => (
        <p key={r.id} style={{ margin: 0 }}>
          {r.title}
        </p>
      ))}
    </div>

    <div style={{ border: "2px solid orange", padding: 10, borderRadius: 10, width: "20%", textAlign: "center" }}>
      <select style={{ backgroundColor: "#000000", color: "#ffffff"}}
        value={selectedId}
        onChange={(e) =>
          setSelectedId(e.target.value === "" ? "" : Number(e.target.value))
        }
      >
        <option value="" style={{color: "0000000" }}
        >Choose recipe to delete…</option>
        {recipes.map((r) => (
          <option key={r.id} value={r.id}
          style={{ backgroundColor: "#000000", color: "#ff0000" }}>
            {r.title}
          </option>
        ))}
      </select>
    </div>

    <div style={{ border: "2px solid orange", padding: 10, borderRadius: 10 }}>
     {/*  <button onClick={deleteSelected} disabled={selectedId === ""}>
        Delete
      </button> */}
    <button
    onClick={() => setShowModal(true)}
    disabled={selectedId === ""}
    >Delete
    </button>
    </div>
      {showModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
    onClick={() => setShowModal(false)} // klick på overlay stänger
  >
    <div
      style={{
        backgroundColor: "black",
        padding: 20,
        borderRadius: 12,
        border: "2px solid orange",
        width: "90%",
        maxWidth: 420,
      }}
      onClick={(e) => e.stopPropagation()} // klick i boxen stänger INTE
    >
      <h2 style={{ marginTop: 0 }}>Confirm delete</h2>

      <p style={{ marginTop: 0 }}>
        Are you sure you want to delete this recipe?
      </p>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", color: "#ffffff" }}>
        <button onClick={() => setShowModal(false)}>
          Cancel
        </button>

        <button
          onClick={async () => {
            await deleteSelected();
            setShowModal(false);
          }}
          disabled={selectedId === ""}
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}
  </div>
)
}