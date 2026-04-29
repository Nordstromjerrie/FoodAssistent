export type Recipe = {
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