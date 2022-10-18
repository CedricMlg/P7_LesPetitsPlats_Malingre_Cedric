class Tag {
  constructor(item, category) {
    this.blockTag = document.querySelector(".header__block-tag");
    this.item = item;
    this.category = category;
    this.tagArray =
      localStorage.getItem("tag") === null
        ? []
        : JSON.parse(localStorage.getItem("tag"));

    this.templateTag = document.createElement("div");

    this.createTag();
    this.removeTag();
  }

  /**
   * It creates a tag element, adds a class, adds a data attribute, adds an innerHTML, pushes the
   * innerText of the clicked element to an array, and then adds the tag element to the DOM.
   */
  createTag() {
    this.templateTag.classList.add("header__tag");
    this.templateTag.dataset.tag = `${this.category}`;
    this.templateTag.innerHTML = `
    <p>${this.item.target.innerText}</p>
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
        />
    </svg>`;

    this.tagArray.push(this.item.target.innerText);
    localStorage.setItem("tag", JSON.stringify(this.tagArray));

    this.blockTag.appendChild(this.templateTag);
  }

  /**
   * When the user clicks on the svg element, the tag is removed from the local storage and the tag is
   * removed from the DOM.
   */
  removeTag() {
    const svg = this.templateTag.querySelector("svg");
    svg.addEventListener("click", () => {
      this.tagArray =
        localStorage.getItem("tag") === null
          ? []
          : JSON.parse(localStorage.getItem("tag"));
      let tagRemove = this.tagArray.filter(
        (tag) => tag !== this.item.target.innerText
      );

      localStorage.setItem("tag", JSON.stringify(tagRemove));

      this.blockTag.removeChild(this.templateTag);
    });
  }
}

export { Tag };
