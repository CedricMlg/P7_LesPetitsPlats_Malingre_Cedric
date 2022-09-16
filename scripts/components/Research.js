import { RecipeCard } from "../factories/RecipeCard.js";

class Research {
  constructor(input) {
    this.input = input;
    this.blockRecipeCards = document.querySelector(".main__block-recipe-cards");
    this.formatedInput = [];
  }

  researchBar(researchArray) {
    this.formatedInput.push(
      this.input
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );
    this.blockRecipeCards.innerHTML = ""

    const researchDescription = researchArray.filter(
      (item) => item.description.indexOf(`${this.formatedInput}`) !== -1
    );
    
    for (const recipe of researchDescription) {
      new RecipeCard().createRecipeCard(recipe);
    }

    if (researchDescription.length === 0) {
      let researchIngredient = null

      for (const recipe of researchArray) {
        researchIngredient = recipe.ingredients.filter(
          (item) => item.ingredient.indexOf(`${this.formatedInput}`) !== -1
        );
      }

      for (const recipe of researchIngredient) {
        new RecipeCard().createRecipeCard(recipe);
      }
      if(researchIngredient.length === 0) {
        const researchName = researchArray.filter(
          (item) => item.name.indexOf(`${this.formatedInput}`) !== -1
        );

        for (const recipe of researchName) {
          new RecipeCard().createRecipeCard(recipe);
        }
      }
    }
  }
}

export { Research };
