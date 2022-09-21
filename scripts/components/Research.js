import { RecipeCard } from "../factories/RecipeCard.js";
import { SplitArray } from "../utils/SplitArray.js";

class Research {
  constructor(input) {
    this.input = input;
    this.formatedInput = "";
    let storedTagArray = JSON.parse(localStorage.tag);
    console.log(storedTagArray)
  }

  researchBar(researchArray) {
    this.formatedInput = this.input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    let result = [];
    result = researchArray.filter(
      (item) => item.description.indexOf(`${this.formatedInput}`) !== -1
    );

    if (result.length === 0) {
      for (const recipe of researchArray) {
        result = recipe.ingredients.filter(
          (item) => item.ingredient.indexOf(`${this.formatedInput}`) !== -1
        );
      }

      if (result.length === 0) {
        result = researchArray.filter(
          (item) => item.name.indexOf(`${this.formatedInput}`) !== -1
        );
      }
    }

    for (const recipe of result) {
      new RecipeCard().createRecipeCard(recipe);
    }
    new SplitArray(result);
  }
}

export { Research };
