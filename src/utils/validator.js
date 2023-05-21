const path = require("path");
const fs = require("fs");
class fileValidator {
  construtor() {}

  resourceExists(filePath) {
    try {
      return fs.existsSync(filePath);
    } catch (e) {
      return e;
    }
  }

  isHTML(filePath) {
    try {
      if (path.extname(filePath) === ".html") {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return e;
    }
  }

  fileGood(filePath) {
    if (this.resourceExists(filePath) && this.isHTML(filePath)) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = fileValidator;
