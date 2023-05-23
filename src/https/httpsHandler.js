const fs = require("fs");
const Validator = require("../utils/validator");
const Log = require("../utils/logger");

class HttpsHandler {
  constructor(conf, express) {
    this.https = require("https");
    this.conf = conf;
    this.express = express;
  }

  loadCert() {
    if (
      Validator.fileGood(this.conf.key, "pem") &&
      Validator.fileGood(this.conf.cert, "pem")
    ) {
      this.cert = {
        key: fs.readFileSync(this.conf.key),
        cert: fs.readFileSync(this.conf.cert),
      };
      Log.info("Certificate Verified");
    } else {
      throw new Error(
        "Could not read key or certificate Make sure PATH to cert are correct in config and if the file has extension of .pem"
      );
    }
  }

  start() {
    try {
      this.instance = this.https.createServer(this.cert, this.express);
      Log.info("HTTPS server started");
    } catch (e) {
      throw Error("Could not start the https server");
    }
  }
}

module.exports = HttpsHandler;
