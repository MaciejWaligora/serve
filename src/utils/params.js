const path = require("path");
const Getopt = require("node-getopt");
const log = require("./logger");
const util = require("util");

const options = new Getopt([
  ["h", "help", "Display help"],
  ["p", "port=", "Specify serving port"],
  ["d", "dir=", "Specify serving directory"],
  ["f", "file=", "Specify entry html file"],
]);

class Configuration {
  constructor(opt) {
    this.parsedOptions = opt.parseSystem();
    this.config = {};
    this.setHttp();
  }

  setHttp() {
    const directory = this.parsedOptions.options.dir
      ? this.parsedOptions.options.dir
      : process.cwd();
    const port = this.parsedOptions.options.port
      ? this.parsedOptions.options.port
      : 3000;
    const file = this.parsedOptions.options.file
      ? this.parsedOptions.options.file
      : "index.html";
    this.config.http = {
      dir: directory,
      port: +port,
      file: file,
    };
    log.info(
      "Loaded configuration:\n",
      util.inspect(this.config, { depth: null, colors: true })
    );
  }

  get port() {
    return this.config.http.port;
  }

  get dir() {
    return this.config.http.dir;
  }

  get file() {
    return this.config.http.file;
  }
}

module.exports = new Configuration(options);
