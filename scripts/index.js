import { recipes } from "../data/recipes.js";
import { ResearchBar } from "./components/ResearchBar.js";
import { ResearchTag } from "./components/ResearchTag.js";
import { RecipeCard } from "./factories/RecipeCard.js";
import { SplitArray } from "./utils/SplitArray.js";

const researchBar = document.querySelector(".header__searchbar-input");
const blockTag = document.querySelector(".header__block-tag");
const blockTagSelector = document.querySelector(".header__block-tag-selector");
const blockRecipeCards = document.querySelector(".main__block-recipe-cards");
let storedResearchArray = JSON.parse(localStorage.getItem("research"));
let storedTagArray = JSON.parse(localStorage.getItem("tag"));

/* A MutationObserver that observes the blockTag element. */
const observer = new MutationObserver(function (mutations_list) {
  storedResearchArray = JSON.parse(localStorage.getItem("research"));
  storedTagArray = JSON.parse(localStorage.getItem("tag"));
  blockRecipeCards.innerHTML = "";

  mutations_list.forEach(function (mutation) {
    mutation.addedNodes.forEach(function () {
      if (storedResearchArray == null || storedResearchArray.length == 0) {
        new ResearchTag(storedTagArray).researchTagFilter(recipes);
      } else {
        for (const tag of storedTagArray) {
          new ResearchTag(tag).researchTagFilter(storedResearchArray);
        }
      }
    });
    mutation.removedNodes.forEach(function () {
      if (blockTag.innerText === "") {
        if (researchBar.value.length >= 3) {
          new ResearchBar(researchBar.value).researchBarFilter(recipes);
        } else {
          for (const recipe of recipes) {
            new RecipeCard().createRecipeCard(recipe);
          }
          new SplitArray(recipes);

          storedResearchArray.splice(0, storedResearchArray.length);
          localStorage.setItem("research", JSON.stringify(storedResearchArray));
        }
      } else {
        if (researchBar.value.length >= 3) {
          new ResearchBar(researchBar.value).researchBarFilter(recipes);
          for (const tag of storedTagArray) {
            new ResearchTag(tag).researchTagFilter(storedResearchArray);
            storedResearchArray = JSON.parse(localStorage.getItem("research"));
          }
        } else {
          storedResearchArray = recipes;
          for (const tag of storedTagArray) {
            new ResearchTag(tag).researchTagFilter(storedResearchArray);
            storedResearchArray = JSON.parse(localStorage.getItem("research"));
          }
        }
      }
    });
  });
});

observer.observe(blockTag, {
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
  storedResearchArray = JSON.parse(localStorage.getItem("research"));
  storedTagArray = JSON.parse(localStorage.getItem("tag"));
  blockRecipeCards.innerHTML = "";
  blockTagSelector.innerHTML = "";

  if (researchBar.value.length >= 3) {
    if (storedResearchArray == null || storedResearchArray.length == 0) {
      new ResearchBar(researchBar.value).researchBarFilter(recipes);
    } else {
      new ResearchBar(researchBar.value).researchBarFilter(storedResearchArray);
    }
  } else {
    if (blockTag.innerText === "") {
      for (const recipe of recipes) {
        new RecipeCard().createRecipeCard(recipe);
      }
      new SplitArray(recipes);

      if (storedResearchArray != null) {
        storedResearchArray.splice(0, storedResearchArray.length);
        localStorage.setItem("research", JSON.stringify(storedResearchArray));
      }
    } else {
      storedResearchArray = recipes;
      for (const tag of storedTagArray) {
        new ResearchTag(tag).researchTagFilter(storedResearchArray);
        storedResearchArray = JSON.parse(localStorage.getItem("research"));
      }
    }
  }
});
