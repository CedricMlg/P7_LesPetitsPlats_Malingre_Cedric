import { RecipeCard } from "../factories/RecipeCard.js";
import { SplitArray } from "../utils/SplitArray.js";
import { Utils } from "../utils/Utils.js";

class ResearchTag {
  constructor(tag) {
    this.storedTagArray = tag;
    this.storedResearchArray =
      localStorage.getItem("research") === null
        ? []
        : JSON.parse(localStorage.getItem("research"));
    this.blockRecipeCards = document.querySelector(".main__block-recipe-cards");
  }

  researchTagFilter(researchArray) {
    this.blockRecipeCards.innerHTML = "";
    let result = [];

    result = researchArray.filter((item) => {
      return item.ingredients.some(
        (element) =>
          Utils.normalizeText(element.ingredient).indexOf(
            this.storedTagArray
          ) !== -1
      );
    });

    if (result.length == 0) {
      result = researchArray.filter(
        (item) =>
          Utils.normalizeText(item.appliance).indexOf(this.storedTagArray) !==
          -1
      );

      if (result.length == 0) {
        result = researchArray.filter((item) => {
          return item.ustensils.some((element) => {
            return (
              Utils.normalizeText(element).indexOf(this.storedTagArray) !== -1
            );
          });
        });
      }
    }

    this.storedResearchArray = result;

    for (const recipe of result) {
      new RecipeCard().createRecipeCard(recipe);
    }
    new SplitArray(result);

    localStorage.setItem("research", JSON.stringify(this.storedResearchArray));
  }
}

export { ResearchTag };
