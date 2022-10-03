import { RecipeCard } from "../factories/RecipeCard.js";
import { SplitArray } from "../utils/SplitArray.js";

class ResearchTag {
  constructor(category, tag) {
    this.category = category;
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
    console.log(this.storedTagArray)

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
    this.storedResearchArray = result;
    console.log(result)

    for (const recipe of result) {
      new RecipeCard().createRecipeCard(recipe);
    }
    new SplitArray(result);

    localStorage.setItem("research", JSON.stringify(this.storedResearchArray));
  }
}

export { ResearchTag };
