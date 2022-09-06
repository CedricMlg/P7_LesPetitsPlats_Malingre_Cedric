import { recipes } from "../data/recipes.js";
import { FactoryRecipeCard } from "./factories/recipeCard.js";

window.addEventListener("load", new FactoryRecipeCard(recipes));
