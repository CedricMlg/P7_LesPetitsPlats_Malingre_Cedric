class Utils {
  /**
   * It takes a string, converts it to lowercase, removes accents, and returns the result
   * @param str - The string to be normalized.
   * @returns the string that is passed in, but it is being modified by the .toLowerCase() and
   * .normalize() methods.
   */
  static normalizeText(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /**
   * It takes an array of strings, joins them into one string, normalizes the string, removes all
   * non-alphabetic characters, splits the string into an array of words, filters out words that are less
   * than 3 characters, sorts the array, and returns a new array with only unique values.
   * @param arrayData - an array of strings
   * @returns An array of unique words that are at least 3 characters long.
   */
  static cleanUpText(arrayData) {
    let normalizeStr = "";
    normalizeStr = this.normalizeText(arrayData.join(" "))
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ")
      .filter((str) => str.length >= 3)
      .sort();

    return [...new Set(normalizeStr)];
  }
}

export { Utils };
