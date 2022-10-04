import { RecipeCard } from "../factories/RecipeCard.js";
import { SplitArray } from "../utils/SplitArray.js";

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

    this.formatedInput = this.input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    result = researchArray.filter(
      (item) =>
        item.description
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .indexOf(`${this.formatedInput}`) !== -1
    );

    if (result.length === 0) {
      result = researchArray.filter((item) => {
        return item.ingredients.some(
          (element) =>
            element.ingredient
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .indexOf(`${this.formatedInput}`) !== -1
        );
      });

      if (result.length === 0) {
        result = researchArray.filter(
          (item) =>
            item.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .indexOf(`${this.formatedInput}`) !== -1
        );
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

export { ResearchBar };
