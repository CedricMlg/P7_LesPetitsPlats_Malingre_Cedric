class Tags {
  constructor(itemsArray, categorie) {
    let uniqueItemArray = [...new Set(itemsArray)];
    const blockTagSelector = document.querySelector(
      ".header__block-tag-selector"
    );

    const templateTagSelector = document.createElement("div");
    templateTagSelector.classList.add(`header__tag-selector`);
    templateTagSelector.dataset.tag = `${categorie}`;
    templateTagSelector.innerHTML = `
            <div class="header__tag-researcher">
          <p>${categorie}</p>
          <input
            type="text"
            placeholder="Rechercher un ${categorie}"
            name="search_${categorie}"
          />
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.12 0.453369L8 6.56004L1.88 0.453369L0 2.33337L8 10.3334L16 2.33337L14.12 0.453369Z"
            />
          </svg>
        </div>
        <div class="header__tag-choice--display">
          <div class="header__tag-choice"></div>
          </div>`;

    const itemBlock = templateTagSelector.querySelector(`.header__tag-choice`);

    itemBlock.innerHTML = "";

    for (const item of uniqueItemArray) {
      const element = document.createElement("p");
      element.innerHTML = `${item}`;
      itemBlock.appendChild(element);
    }

    templateTagSelector.addEventListener("click", () => {
      const selectorResearch = templateTagSelector.querySelector(
        ".header__tag-researcher"
      );
      const selectorDisplay = templateTagSelector.querySelector(
        ".header__tag-choice--display"
      );

      selectorResearch.querySelector("p").classList.add("active");
      selectorResearch.querySelector("input").classList.add("active");
      selectorResearch.querySelector("svg").classList.add("active");
      selectorDisplay.classList.add("active");
    });

    blockTagSelector.appendChild(templateTagSelector);
  }
}

export { Tags };
