import { TagSelector } from "../factories/TagSelector.js";

class ResearchBarTag {
  constructor(input, category) {
    this.input = input;
    this.category = category;
    this.formatedInput = "";
  }

  researchBarTagFilter(researchArray) {
    this.formatedInput = this.input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    let result = [];

    result = researchArray.filter((item) => item.toLowerCase().indexOf(`${this.formatedInput}`) !== -1);
    new TagSelector(result, this.category).createItemTagSelector(result);
  }
}

export { ResearchBarTag };
