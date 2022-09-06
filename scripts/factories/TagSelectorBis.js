import { Tags } from "./Tags.js";

class TagSelector {
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

    new Tags(ingredientsArray, "ingredients");
    new Tags(applianceArray, "appareils");
    new Tags(ustensilsArray, "ustensiles");
  }
}

export { TagSelector };
