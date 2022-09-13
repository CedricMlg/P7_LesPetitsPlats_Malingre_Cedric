import { recipes } from "../data/recipes.js";
import { RecipeCard } from "./factories/RecipeCard.js";
import { SplitArray } from "./utils/SplitArray.js";

window.addEventListener("load", () => refreshTagAndRecipe(recipes));

function refreshTagAndRecipe(recipeData) {
  new RecipeCard(recipeData);
  new SplitArray(recipeData);
}
