import { RecipeCard } from "../factories/RecipeCard.js";
import { SplitArray } from "../utils/SplitArray.js";
import { Utils } from "../utils/Utils.js";

class ResearchBar {
  constructor(input) {
    this.input = input;
    this.formatedInput = "";
    this.storedResearchArray =
      localStorage.getItem("research") === null
        ? []
        : JSON.parse(localStorage.getItem("research"));
    this.blockRecipeCards = document.querySelector(".main__block-recipe-cards");
  }

  researchBarFilter(researchArray) {
    this.blockRecipeCards.innerHTML = "";
    let result = [];

    this.formatedInput = Utils.normalizeText(this.input);

    result = researchArray.filter(
      (item) =>
        Utils.normalizeText(item.description).indexOf(this.formatedInput) !== -1
    );

    if (result.length === 0) {
      result = researchArray.filter((item) => {
        return item.ingredients.some(
          (element) =>
            Utils.normalizeText(element.ingredients).indexOf(
              this.formatedInput
            ) !== -1
        );
      });

      if (result.length === 0) {
        result = researchArray.filter(
          (item) =>
            Utils.normalizeText(item.name).indexOf(this.formatedInput) !== -1
        );
      }
    }

    this.storedResearchArray = result;

    result.forEach((recipe) => {
      new RecipeCard().createRecipeCard(recipe);
    });
    new SplitArray(result);

    localStorage.setItem("research", JSON.stringify(this.storedResearchArray));
  }
}

export { ResearchBar };
