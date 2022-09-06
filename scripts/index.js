import { recipes } from "../data/recipes.js";
import { RecipeCard } from "./factories/RecipeCard.js";
import { TagSelector } from "./factories/TagSelectorBis.js";

window.addEventListener("load", () => refreshTagAndRecipe(recipes));

function refreshTagAndRecipe(recipeData) {
  new RecipeCard(recipeData);
  new TagSelector(recipeData);
}
