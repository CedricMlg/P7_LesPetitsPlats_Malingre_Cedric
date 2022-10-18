class RecipeCard {
  constructor() {
    this.blockRecipeCards = document.querySelector(".main__block-recipe-cards");
    this.recipeCard = document.createElement("figure");
  }

  /**
   * This function creates a recipe card and appends it to the DOM.
   * @param recipe - {
   */
  createRecipeCard(recipe) {
    this.recipeCard.classList.add("main__recipe-card");
    this.recipeCard.innerHTML = `
    <div class="main__recipe-block-img">
      <img
        class="main__recipe-img"
        src="./assets/images/fillRecipeImg.png"
        alt="image of a recipe"
      />
    </div>
    <figcaption class="main__recipe-caption">
      <div class="main__recipe-titlextime">
        <p>${recipe.name}</p>
        <div class="main__recipe-time">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4_71)">
              <path
                d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z"
                fill="black"
              />
            </g>
          </svg>
          <p>${recipe.time} min</p>
        </div>
      </div>
      <div class="main__recipe-ingredientsxdescription">
        <div class="main__recipe-ingredients">
        </div>
        <p class="main__recipe-description">
            ${recipe.description}
        </p>
      </div>
    </figcaption>`;

    this.blockRecipeCards.appendChild(this.recipeCard);

    this.createIngredient(recipe);
  }

  /**
   * It takes the recipe object and loops through the ingredients array, creating a new p element for
   * each ingredient and appending it to the recipeCardIngredients div.
   * @param recipe - {
   */
  createIngredient(recipe) {
    const recipeCardIngredients = this.recipeCard.querySelector(
      ".main__recipe-ingredients"
    );

    recipe.ingredients.forEach((element) => {
      const ingredient = document.createElement("p");

      if (element.unit == null && element.quantity == null) {
        ingredient.innerHTML = `<span>${element.ingredient}</span>`;
      } else if (element.unit == null) {
        ingredient.innerHTML = `<span>${element.ingredient}:</span> ${element.quantity}`;
      } else {
        ingredient.innerHTML = `<span>${element.ingredient}:</span> ${element.quantity} ${element.unit}`;
      }

      recipeCardIngredients.appendChild(ingredient);
    });
  }
}

export { RecipeCard };
