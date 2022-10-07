import { ResearchBarTag } from "../components/ResearchBarTag.js";
import { Tag } from "./Tag.js";
import { Utils } from "../utils/Utils.js";

class TagSelector {
  constructor(itemsArray, category) {
    this.blockTagSelector = document.querySelector(
      ".header__block-tag-selector"
    );
    this.templateTagSelector = document.createElement("div");
    this.category = category;
    this.itemsArray = itemsArray;
  }

  createTagSelector() {
    this.templateTagSelector.classList.add(`header__tag-selector`);
    this.templateTagSelector.dataset.tag = `${this.category}`;
    this.templateTagSelector.innerHTML = `
            <div class="header__tag-researcher">
          <p>${this.category}</p>
          <input
            type="text"
            placeholder="Rechercher un ${this.category}"
            name="search_${this.category}"
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
    this.listenTagSelector();
    this.listenResearchBarTagSelector();
    this.createItemTagSelector(this.itemsArray);
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

  listenResearchBarTagSelector() {
    const researchBarTag = this.templateTagSelector.querySelector(
      ".header__tag-researcher input"
    );
    const itemBlock = document.querySelector(
      `[data-tag="${this.category}"] .header__tag-choice`
    );
    const researchBar = document.querySelector(".header__searchbar-input");
    let itemsArray = [];

    const observer = new MutationObserver(function (mutations_list) {
      itemsArray = [];
      mutations_list.forEach(function (mutation) {
        mutation.addedNodes.forEach(function () {
          itemBlock
            .querySelectorAll("p")
            .forEach((item) => itemsArray.push(item.innerText));
          mutation.removedNodes.forEach(function () {
            itemBlock
              .querySelectorAll("p")
              .forEach((item) => itemsArray.push(item.innerText));
          });
        });
      });
    });

    observer.observe(document.querySelector(".header__block-tag"), {
      subtree: false,
      childList: true,
    });

    researchBar.addEventListener("input", () => {
      itemBlock
        .querySelectorAll("p")
        .forEach((item) => itemsArray.push(item.innerText));
    });

    researchBarTag.addEventListener("input", () => {
      if (itemsArray.length == 0) {
        itemBlock
          .querySelectorAll("p")
          .forEach((item) => itemsArray.push(item.innerText));
      }

      new ResearchBarTag(
        researchBarTag.value,
        this.category
      ).researchBarTagFilter(itemsArray);
    });
  }

  createItemTagSelector(itemsArray) {
    const itemBlock = document.querySelector(
      `[data-tag="${this.category}"] .header__tag-choice`
    );
    let element = null;
    let sortedItemArray = [];
    let uniqueItemArray = [];

    for (const item of itemsArray) {
      sortedItemArray.push(Utils.normalizeText(item));
    }
    sortedItemArray.sort();
    uniqueItemArray = [...new Set(sortedItemArray)];

    itemBlock.innerHTML = "";

    for (const item of uniqueItemArray) {
      element = document.createElement("p");
      element.innerHTML = `${item}`;
      itemBlock.appendChild(element);
    }

    const items = itemBlock.querySelectorAll(`.header__tag-choice p`);

    items.forEach((element) => {
      element.addEventListener("click", (event) => {
        new Tag(event, this.category);
      });
    });
  }
}

export { TagSelector };
