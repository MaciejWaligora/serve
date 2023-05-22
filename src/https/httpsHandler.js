const fs = require("fs");

class HttpsHandler {
  constructor(conf, express) {
    this.https = require("https");
    this.conf = conf;
    this.express = express;
  }

  async loadCert() {
    this.cert = {
      key: fs.readFileSync(this.conf.key),
      cert: fs.readFileSync(this.conf.cert),
    };
  }

  start() {
    this.instance = this.https.createServer(this.cert, this.express);
  }
}

module.exports = HttpsHandler;
