import { recipes } from "../data/recipes.js";
import { FactoryRecipeCard } from "./factories/recipeCard.js";
import { FactoryTagSelector } from "./factories/tagSelector.js";

const tagSelector = document.querySelectorAll(".header__tag-selector");

tagSelector.forEach((element) => {
  element.addEventListener("click", () => {
    const selectorResearch = element.querySelector(".header__tag-researcher");
    const selectorDisplay = element.querySelector(
      ".header__tag-choice--display"
    );

    selectorResearch.querySelector("p").classList.add("active");
    selectorResearch.querySelector("input").classList.add("active");
    selectorResearch.querySelector("svg").classList.add("active");
    selectorDisplay.classList.add("active");
  });
});

window.addEventListener("load", () => refreshTagAndRecipe(recipes));

function refreshTagAndRecipe(recipeData) {
  new FactoryRecipeCard(recipeData);
  new FactoryTagSelector(recipeData);
}
