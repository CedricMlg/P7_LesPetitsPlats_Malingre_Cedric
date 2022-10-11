import { TagSelector } from "../factories/TagSelector.js";

class SplitArray {
  constructor(recipeData) {
    const blockTagSelector = document.querySelector(
      ".header__block-tag-selector"
    );
    let ingredientsArray = [];
    let applianceArray = [];
    let ustensilsArray = [];

    recipeData.forEach((item) => {
      applianceArray.push(item.appliance);
      for (const ustensil of item.ustensils) {
        ustensilsArray.push(ustensil);
      }
      for (const ingredient of item.ingredients) {
        ingredientsArray.push(ingredient.ingredient);
      }
    });

    if (blockTagSelector.childNodes.length == 0) {
      new TagSelector(ingredientsArray, "ingredients").createTagSelector();
      new TagSelector(applianceArray, "appareils").createTagSelector();
      new TagSelector(ustensilsArray, "ustensiles").createTagSelector();
    } else {
      new TagSelector(ingredientsArray, "ingredients").createItemTagSelector(
        ingredientsArray
      );
      new TagSelector(applianceArray, "appareils").createItemTagSelector(
        applianceArray
      );
      new TagSelector(ustensilsArray, "ustensiles").createItemTagSelector(
        ustensilsArray
      );
    }
  }
}

export { SplitArray };
