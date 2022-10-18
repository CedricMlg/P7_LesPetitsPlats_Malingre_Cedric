class Utils {
  /**
   * It takes a string, converts it to lowercase, removes diacritics, and returns the result
   * @param str - The string to be normalized.
   * @returns the string that is passed in, but it is being modified.
   */
  static normalizeText(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
}

export { Utils };
