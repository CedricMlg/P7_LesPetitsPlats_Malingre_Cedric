import { recipes } from "../data/recipes.js";
import { Research } from "./components/Research.js";
import { RecipeCard } from "./factories/RecipeCard.js";
import { ResearchArray } from "./utils/ResearchArray.js";
import { SplitArray } from "./utils/SplitArray.js";

const researchBar = document.querySelector(".header__searchbar-input");

window.addEventListener("load", () => {
  for (const recipe of recipes) {
    new RecipeCard().createRecipeCard(recipe);
  }
  new SplitArray(recipes);
});

researchBar.addEventListener("input", () => {
  if(researchBar.value.length >= 3) {
    new Research(researchBar.value).researchBar(recipes);
  } else {
    for (const recipe of recipes) {
      new RecipeCard().createRecipeCard(recipe);
    }
  }
});
// new ResearchArray().updateResearchArray(recipes)