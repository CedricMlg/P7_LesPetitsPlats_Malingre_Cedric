import { Tag } from "./Tag.js";

class TagSelector {
  constructor(itemsArray, category) {
    this.blockTagSelector = document.querySelector(
      ".header__block-tag-selector"
    );
    this.templateTagSelector = document.createElement("div");
    this.category = category;
    let sortedItemArray = [];

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

    this.createTagSelector(category);
    this.listenTagSelector();
    this.createItemTagSelector(uniqueItemArray);
  }

  createTagSelector(category) {
    this.templateTagSelector.classList.add(`header__tag-selector`);
    this.templateTagSelector.dataset.tag = `${category}`;
    this.templateTagSelector.innerHTML = `
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

    this.blockTagSelector.appendChild(this.templateTagSelector);
  }

  listenTagSelector() {
    const selectorResearch = this.templateTagSelector.querySelector(
      ".header__tag-researcher"
    );
    const activables = selectorResearch.querySelectorAll("p, input, svg");
    const svg = this.templateTagSelector.querySelector(
      `.header__tag-researcher svg`
    );
    const selectorDisplay = this.templateTagSelector.querySelector(
      ".header__tag-choice--display"
    );

    this.templateTagSelector.addEventListener("click", (element) => {
      selectorDisplay.classList.add("active");
      document.querySelector("main").classList.add("active");

      for (const element of activables) {
        element.classList.add("active");
      }

      if (svg.dataset.clicked === "true" && svg.contains(element.target)) {
        closeTagSelector();
        svg.dataset.clicked = "false";
      } else {
        svg.dataset.clicked = "true";
      }

      document.addEventListener("click", checkClickLocation, true);
    });

    function closeTagSelector() {
      selectorDisplay.classList.remove("active");
      document.querySelector("main").classList.remove("active");

      for (const element of activables) {
        element.classList.remove("active");
      }

      document.removeEventListener("click", checkClickLocation, true);
    }

    function checkClickLocation(element) {
      if (element.target === svg || svg.contains(element.target)) {
        closeTagSelector();
        return;
      } else if (element.target === this.templateTagSelector) {
        return;
      } else {
        closeTagSelector();
        return;
      }
    }
  }

  createItemTagSelector(uniqueItemArray) {
    const itemBlock =
      this.templateTagSelector.querySelector(`.header__tag-choice`);
    let element = null;

    itemBlock.innerHTML = "";

    for (const item of uniqueItemArray) {
      element = document.createElement("p");
      element.innerHTML = `${item}`;
      itemBlock.appendChild(element);
    }

    const items = this.templateTagSelector.querySelectorAll(
      `.header__tag-choice p`
    );

    items.forEach((element) => {
      element.addEventListener("click", (event) => {
        new Tag(event, this.category);
      });
    });
  }
}

export { TagSelector };
