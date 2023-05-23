const path = require("path");
const fs = require("fs");
class Validator {
  static fileGood(filePath, extension) {
    if (fs.existsSync(filePath) && path.extname(filePath) === `.${extension}`) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Validator;
