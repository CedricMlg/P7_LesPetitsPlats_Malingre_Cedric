import { RecipeCard } from "../factories/RecipeCard.js";
import { SplitArray } from "../utils/SplitArray.js";

class ResearchTag {
  constructor(category) {
    this.category = category;
    this.storedTagArray = JSON.parse(localStorage.tag);
  }

  researchTagFilter(researchArray) {
    console.log(this.storedTagArray)
  }
}

export { ResearchTag };
