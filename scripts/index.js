import { recipes } from "../data/recipes.js";
import { ResearchBar } from "./components/ResearchBar.js";
import { ResearchTag } from "./components/ResearchTag.js";
import { RecipeCard } from "./factories/RecipeCard.js";
// import { ResearchArray } from "./utils/ResearchArray.js";
import { SplitArray } from "./utils/SplitArray.js";

const researchBar = document.querySelector(".header__searchbar-input");
const blockTag = document.querySelector(".header__block-tag");
const blockTagSelector = document.querySelector(".header__block-tag-selector");
const blockRecipeCards = document.querySelector(".main__block-recipe-cards");

const observer = new MutationObserver(function (mutations_list) {
  let storedResearchArray = JSON.parse(localStorage.getItem("research"));
  let storedTagArray = JSON.parse(localStorage.getItem("tag"));

  mutations_list.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (added_node) {
      if (storedResearchArray == null || storedResearchArray.length == 0) {
        new ResearchTag(
          added_node.dataset.tag,
          storedTagArray
        ).researchTagFilter(recipes);
      } else {
        for (const tag of storedTagArray) {
          new ResearchTag(added_node.dataset.tag, tag).researchTagFilter(
            storedResearchArray
          );
        }
      }
    });
    mutation.removedNodes.forEach(function (added_node) {
      if (blockTag.innerText === "") {
        for (const recipe of recipes) {
          new RecipeCard().createRecipeCard(recipe);
        }
        new SplitArray(recipes);

        storedResearchArray.splice(0, storedResearchArray.length);
        localStorage.setItem("research", JSON.stringify(storedResearchArray));
      } else {
        storedResearchArray = recipes;
        for (const tag of storedTagArray) {
          new ResearchTag(added_node.dataset.tag, tag).researchTagFilter(
            storedResearchArray
          );
          storedResearchArray = JSON.parse(localStorage.getItem("research"));
        }
      }
    });
  });
});

observer.observe(document.querySelector(".header__block-tag"), {
  subtree: false,
  childList: true,
});

window.addEventListener("load", () => {
  for (const recipe of recipes) {
    new RecipeCard().createRecipeCard(recipe);
  }
  new SplitArray(recipes);
  localStorage.clear();
});

researchBar.addEventListener("input", () => {
  blockRecipeCards.innerHTML = "";
  blockTagSelector.innerHTML = "";

  if (researchBar.value.length >= 3) {
    new ResearchBar(researchBar.value).researchBarFilter(recipes);
  } else {
    for (const recipe of recipes) {
      new RecipeCard().createRecipeCard(recipe);
    }
    new SplitArray(recipes);
  }
});
// new ResearchArray().updateResearchArray(recipes)
