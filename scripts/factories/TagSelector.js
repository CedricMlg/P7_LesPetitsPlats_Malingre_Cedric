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

  /**
   * It creates a tag selector with a search bar and a list of items.
   * </code>
   */
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

  /**
   * When the user clicks on the tag selector, the tag selector opens, and when the user clicks anywhere
   * else, the tag selector closes.
   * </code>
   */
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
    const templateTagSelector = this.templateTagSelector;

    templateTagSelector.addEventListener("click", (element) => {
      templateTagSelector.classList.add("active");
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

    /**
     * It removes the active class from the templateTagSelector, selectorDisplay, and main elements, and
     * then removes the active class from all elements in the activables array
     */
    function closeTagSelector() {
      templateTagSelector.classList.remove("active");
      selectorDisplay.classList.remove("active");
      document.querySelector("main").classList.remove("active");

      for (const element of activables) {
        element.classList.remove("active");
      }

      document.removeEventListener("click", checkClickLocation, true);
    }

    /**
     * If the user clicks on the SVG, the tag selector is closed. If the user clicks on the tag selector,
     * the tag selector is not closed. If the user clicks anywhere else, the tag selector is closed
     * @param element - the event object
     * @returns the value of the function.
     */
    function checkClickLocation(element) {
      if (element.target === svg || svg.contains(element.target)) {
        closeTagSelector();
        return;
      } else if (element.target === templateTagSelector) {
        return;
      } else {
        closeTagSelector();
        return;
      }
    }
  }

  /**
   * It listens to the input of the research bar and filters the tags in the tag selector.
   */
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

  /**
   * It creates a list of tags from an array of items, and then adds an event listener to each tag.
   * @param itemsArray - an array of strings
   */
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

    for (const element of items) {
      element.addEventListener("click", (event) => {
        let storedTagArray = JSON.parse(localStorage.getItem("tag"));
        if (
          storedTagArray != null &&
          storedTagArray.includes(event.target.innerText)
        ) {
          return;
        } else {
          new Tag(event, this.category);
        }
      });
    }
  }
}

export { TagSelector };
