import { TagSelector } from "../factories/TagSelector.js";
import { Utils } from "../utils/Utils.js";

class ResearchBarTag {
  constructor(input, category) {
    this.input = input;
    this.category = category;
    this.formatedInput = "";
  }

  researchBarTagFilter(researchArray) {
    this.formatedInput = Utils.normalizeText(this.input);
    let result = [];

    result = researchArray.filter(
      (item) => item.toLowerCase().indexOf(this.formatedInput) !== -1
    );
    new TagSelector(result, this.category).createItemTagSelector(result);
  }
}

export { ResearchBarTag };
