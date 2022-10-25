import { recipes } from "../../data/recipes.js";
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

  /**
   * It filters the recipes array and displays the results in the DOM.
   * </code>
   * @param researchArray - an array of objects containing the searchable properties of the recipes
   */
  researchBarFilter(researchArray) {
    this.blockRecipeCards.innerHTML = "";
    let result = [];

    this.formatedInput = Utils.normalizeText(this.input);

    researchArray.forEach(item => {
      if (item.search.indexOf(this.formatedInput) !== -1) {
        let recipe = recipes.find(element => element.id == item.id);
        result.push(recipe);
      }
    });

    this.storedResearchArray = result;

    result.forEach((recipe) => {
      new RecipeCard().createRecipeCard(recipe);
    });
    new SplitArray(result);

    localStorage.setItem("research", JSON.stringify(this.storedResearchArray));
  }
}

export { ResearchBar };
