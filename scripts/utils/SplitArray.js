import { TagSelector } from "../factories/TagSelector.js";

class SplitArray {
  constructor(recipeData) {
    let ingredientsArray = [];
    let applianceArray = [];
    let ustensilsArray = [];

    for (const item of recipeData) {
      applianceArray.push(item.appliance);
      for (const ustensil of item.ustensils) {
        ustensilsArray.push(ustensil);
      }
      for (const ingredient of item.ingredients) {
        ingredientsArray.push(ingredient.ingredient);
      }
    }

    new TagSelector(ingredientsArray, "ingredients");
    new TagSelector(applianceArray, "appareils");
    new TagSelector(ustensilsArray, "ustensiles");
  }
}

export { SplitArray };
