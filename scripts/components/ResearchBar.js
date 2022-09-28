import { RecipeCard } from "../factories/RecipeCard.js";
import { SplitArray } from "../utils/SplitArray.js";

class ResearchBar {
  constructor(input) {
    this.input = input;
    this.formatedInput = "";
  }

  researchBarFilter(researchArray) {
    this.formatedInput = this.input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    let result = [];
    result = researchArray.filter(
      (item) =>
        item.description
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .indexOf(`${this.formatedInput}`) !== -1
    );

    if (result.length === 0) {
      for (const recipe of researchArray) {
        result = recipe.ingredients.filter(
          (item) =>
            item.ingredient
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .indexOf(`${this.formatedInput}`) !== -1
        );
      }

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

    for (const recipe of result) {
      new RecipeCard().createRecipeCard(recipe);
    }
    new SplitArray(result);
  }
}

export { ResearchBar };
