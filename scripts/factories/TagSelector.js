class TagSelector {
  constructor(itemsArray, category) {
    let sortedItemArray = [];
    const blockTagSelector = document.querySelector(
      ".header__block-tag-selector"
    );

    for (const item of itemsArray) {
      sortedItemArray.push(
        item
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      );
    }
    sortedItemArray.sort();

    let uniqueItemArray = [...new Set(sortedItemArray)];

    const templateTagSelector = document.createElement("div");
    templateTagSelector.classList.add(`header__tag-selector`);
    templateTagSelector.dataset.tag = `${category}`;
    templateTagSelector.innerHTML = `
            <div class="header__tag-researcher">
          <p>${category}</p>
          <input
            type="text"
            placeholder="Rechercher un ${category}"
            name="search_${category}"
          />
          <svg
            viewBox="0 0 16 11"
            xmlns="http://www.w3.org/2000/svg"
            data-clicked="false"
          >
            <path
              d="M14.12 0.453369L8 6.56004L1.88 0.453369L0 2.33337L8 10.3334L16 2.33337L14.12 0.453369Z"
            />
          </svg>
        </div>
        <div class="header__tag-choice--display">
          <div class="header__tag-choice"></div>
          </div>`;

    const selectorResearch = templateTagSelector.querySelector(
      ".header__tag-researcher"
    );
    const svg = templateTagSelector.querySelector(
      `.header__tag-researcher svg`
    );
    const selectorDisplay = templateTagSelector.querySelector(
      ".header__tag-choice--display"
    );
    const itemBlock = templateTagSelector.querySelector(`.header__tag-choice`);

    itemBlock.innerHTML = "";

    for (const item of uniqueItemArray) {
      const element = document.createElement("p");
      element.innerHTML = `${item}`;
      itemBlock.appendChild(element);
    }

    templateTagSelector.addEventListener("click", (element) => {
      selectorResearch.querySelector("p").classList.add("active");
      selectorResearch.querySelector("input").classList.add("active");
      selectorResearch.querySelector("svg").classList.add("active");
      selectorDisplay.classList.add("active");

      if (svg.dataset.clicked === "true" && svg.contains(element.target)) {
        closeTagSelector();
        svg.dataset.clicked = "false";
      } else {
        svg.dataset.clicked = "true";
      }

      document.addEventListener("click", checkClickLocation, true);
    });

    function closeTagSelector() {
      selectorResearch.querySelector("p").classList.remove("active");
      selectorResearch.querySelector("input").classList.remove("active");
      selectorResearch.querySelector("svg").classList.remove("active");
      selectorDisplay.classList.remove("active");

      document.removeEventListener("click", checkClickLocation, true);
    }

    function checkClickLocation(element) {
      if (element.target === svg || svg.contains(element.target)) {
        closeTagSelector();
        return;
      } else if (
        element.target === templateTagSelector ||
        templateTagSelector.contains(element.target)
      ) {
        return;
      } else {
        closeTagSelector();
        return;
      }
    }

    blockTagSelector.appendChild(templateTagSelector);
  }
}

export { TagSelector };
