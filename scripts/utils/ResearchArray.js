class ResearchArray {
    constructor() {
        this.researchArray = [];
    }

    updateResearchArray(recipes) {
        let recipeArray = [];
        let sortedRecipeArray = [];
      
        for (const recipe of recipes) {
          recipeArray.push(recipe.name);
          recipeArray.push(recipe.description);
          recipeArray.push(recipe.appliance);
          for (const ustensil of recipe.ustensils) {
            recipeArray.push(ustensil);
          }
          for (const ingredient of recipe.ingredients) {
            recipeArray.push(ingredient.ingredient);
          }
        }
      
        for (const recipeElement of recipeArray) {
          sortedRecipeArray.push(
            recipeElement
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          );
        }
        sortedRecipeArray.sort();
      
        return this.researchArray = [...new Set(sortedRecipeArray)];
    }
}

export { ResearchArray };