import { RecipeCard } from "../factories/RecipeCard.js";
import { SplitArray } from "../utils/SplitArray.js";

class ResearchTag {
  constructor(category) {
    this.category = category;
    this.storedTagArray = JSON.parse(localStorage.tag);
  }

  researchTagFilter(researchArray) {
    let result = [];

    result = researchArray.filter(
      (item) => item.description.indexOf(`${this.storedTagArray}`) !== -1
    );

    for (const recipe of result) {
      new RecipeCard().createRecipeCard(recipe);
    }
    new SplitArray(result);
  }
}

export { ResearchTag };
