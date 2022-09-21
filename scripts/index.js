import { recipes } from "../data/recipes.js";
import { Research } from "./components/Research.js";
import { RecipeCard } from "./factories/RecipeCard.js";
import { ResearchArray } from "./utils/ResearchArray.js";
import { SplitArray } from "./utils/SplitArray.js";

const researchBar = document.querySelector(".header__searchbar-input");
const blockTagSelector = document.querySelector(".header__block-tag-selector");
const blockRecipeCards = document.querySelector(".main__block-recipe-cards");

window.addEventListener("load", () => {
  for (const recipe of recipes) {
    new RecipeCard().createRecipeCard(recipe);
  }
  new SplitArray(recipes);
});

researchBar.addEventListener("input", () => {
  blockRecipeCards.innerHTML = "";
  blockTagSelector.innerHTML = "";
  
  if (researchBar.value.length >= 3) {
    new Research(researchBar.value).researchBar(recipes);
  } else {
    for (const recipe of recipes) {
      new RecipeCard().createRecipeCard(recipe);
    }
    new SplitArray(recipes);
  }
});
// new ResearchArray().updateResearchArray(recipes)
