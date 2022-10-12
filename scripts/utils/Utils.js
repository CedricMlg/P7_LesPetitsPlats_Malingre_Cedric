class Utils {
  static normalizeText(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

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
