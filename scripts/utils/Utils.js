class Utils {
  static normalizeText(str) {
    console.log(str)
    return str.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }
}

export { Utils };
