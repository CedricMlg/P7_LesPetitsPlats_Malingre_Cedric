class FactoryTagSelector {
  constructor(items) {
    this.tagSelectorIngredientsBlock = document.querySelector(
      '.header__tag-selector[data-tag="ingredient"] .header__tag-choice--display .header__tag-choice'
    );
    this.tagSelectorApplianceBlock = document.querySelector(
      '.header__tag-selector[data-tag="appliance"] .header__tag-choice--display .header__tag-choice'
    );
    this.tagSelectorUstensilsBlock = document.querySelector(
      '.header__tag-selector[data-tag="ustensil"] .header__tag-choice--display .header__tag-choice'
    );
    let ingredientsArray = [];
    let applianceArray = [];
    let ustensilsArray = [];

    this.tagSelectorIngredientsBlock.innerHTML = "";
    this.tagSelectorApplianceBlock.innerHTML = "";
    this.tagSelectorUstensilsBlock.innerHTML = "";

    for (const item of items) {
      applianceArray.push(item.appliance);
      for (const ustensil of item.ustensils) {
        ustensilsArray.push(ustensil);
      }
      for (const ingredient of item.ingredients) {
        ingredientsArray.push(ingredient.ingredient);
      }
    }

    let uniqueIngredientsArray = [...new Set(ingredientsArray)];
    let uniqueApplianceArray = [...new Set(applianceArray)];
    let uniqueUstensilsArray = [...new Set(ustensilsArray)];

    this.createIngredient(uniqueIngredientsArray);
    this.createAppliance(uniqueApplianceArray);
    this.createUstensil(uniqueUstensilsArray);
  }

  createIngredient(items) {
    for (const item of items) {
      const ingredient = document.createElement("p");
      ingredient.innerHTML = `${item}`;
      this.tagSelectorIngredientsBlock.appendChild(ingredient);
    }
  }

  createAppliance(items) {
    for (const item of items) {
      const appliance = document.createElement("p");
      appliance.innerHTML = `${item}`;
      this.tagSelectorApplianceBlock.appendChild(appliance);
    }
  }

  createUstensil(items) {
    for (const item of items) {
      const ustensil = document.createElement("p");
      ustensil.innerHTML = `${item}`;
      this.tagSelectorUstensilsBlock.appendChild(ustensil);
    }
  }
}

export { FactoryTagSelector };
