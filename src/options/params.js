const path = require("path");
const Getopt = require("node-getopt");
const log = require("../utils/logger");

const options = new Getopt([
  ["h", "help", "Display help"],
  ["p", "port=", "Specify serving port"],
  ["d", "dir=", "Specify serving directory"],
]);

class Configuration {
  constructor(opt) {
    this.parsedOptions = opt.parseSystem();
    this.config = {};
    this.setHttp();
  }

  setHttp() {
    const directory = this.parsedOptions.options.dir
      ? parsedOptions.options.dir
      : process.cwd();
    const port = this.parsedOptions.options.port
      ? this.parsedOptions.options.port
      : 3000;
    this.config.http = {
      dir: directory,
      port: +port,
    };

    log.info("Loaded configuration:", this.config);
  }

  get port() {
    return this.config.http.port;
  }

  get dir() {
    return this.config.http.dir;
  }
}

module.exports = new Configuration(options);
