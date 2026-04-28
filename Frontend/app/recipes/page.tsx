import Link from "next/link";
type Recipe = {
  id: number;
  title: string;
  instructions: string;
  cookingTime: number | null;
  difficulty: string;
  spicyLevel: string;
  calories: number;
  imageUrl: string; 
  mealType: string;
};

async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch("http://localhost:8080/recipe/get/all/recipes", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch recipes: ${res.status}`);
  return res.json();
}

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <main style={{ padding: 24 }}>
      
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10, }}>Recipes</h1>
      <Link href="/recipes-client" style={{ padding: "10px 14px", borderRadius: 10, marginTop: 12, border: "1px solid #ff9900" }}> Menu </Link>
      
      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {recipes.map((r) => (
         
          <div
            key={r.id}
            style={{ border: "1px solid #ff9500", borderRadius: 12, padding: 12 }}
          >
                <img
        src={r.imageUrl}
  
        style={{ height:16, width: "15%", borderRadius: 12, marginLeft: 1200
  }}
/>
            <div style={{ display: "flex",fontSize: 18, fontWeight: 600 }}>{r.title}</div>
            <div>Difficulty: {r.difficulty} </div>
            <div>Spicy Level: {r.spicyLevel}</div>
            <div>Cooking time: {r.cookingTime ?? "-"} min</div>
            <div>Calories: {r.calories ?? "-"}</div>
            <div>Instructions: {r.instructions}</div>
            <div>Meal Type: {r.mealType}</div>
      
          </div>
        ))}
      
      </div>
     
      
    </main>
  );
}
