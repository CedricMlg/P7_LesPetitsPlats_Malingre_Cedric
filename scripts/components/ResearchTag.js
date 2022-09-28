import { RecipeCard } from "../factories/RecipeCard.js";
import { SplitArray } from "../utils/SplitArray.js";

class ResearchTag {
  constructor(category) {
    this.category = category;
    this.storedTagArray = JSON.parse(localStorage.tag);
  }

  researchTagFilter(researchArray) {
    let result = [];

    if (this.category == "ingredients") {
      result = researchArray.filter((item) => {
        return item.ingredients.some(
          (element) =>
            element.ingredient
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .indexOf(`${this.storedTagArray}`) !== -1
        );
      });
    } else if (this.category == "appareils") {
      result = researchArray.filter(
        (item) =>
          item.appliance
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .indexOf(`${this.storedTagArray}`) !== -1
      );
    } else if (this.category == "ustensiles") {
      result = researchArray.filter((item) => {
        return item.ustensils.some((element) => {
          return (
            element
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .indexOf(`${this.storedTagArray}`) !== -1
          );
        });
      });
    }

    for (const recipe of result) {
      new RecipeCard().createRecipeCard(recipe);
    }
    new SplitArray(result);
  }
}

export { ResearchTag };
