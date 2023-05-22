const path = require("path");
const Getopt = require("node-getopt");
const log = require("./logger");
const util = require("util");
const fileValidator = require("./validator");

const options = new Getopt([
  ["h", "help", "Display help"],
  ["p", "port=", "Specify serving port"],
  ["d", "dir=", "Specify serving directory"],
  ["f", "file=", "Specify entry html file"],
  ["h", "https=", "set https"],
  ["k", "key=", "set https key file"],
  ["c", "cert=", "set https cert file"],
]);

const fileCheckerr = new fileValidator();

class Configuration {
  constructor(opt) {
    this.parsedOptions = opt.parseSystem();
    this.config = {};
    try {
      this.setHttp();
      this.parsedOptions.options.https ? this.setHttps() : null;
      log.info(
        "Loaded configuration:\n",
        util.inspect(this.config, { depth: null, colors: true })
      );
    } catch (e) {
      log.error("Failed To load Configuration: ", e.message);
      log.error("Exiting...");
      process.exit(0);
    }
  }

  setHttp() {
    const port = this.parsedOptions.options.port
      ? this.parsedOptions.options.port
      : 3000;

    const [directory, file] = this.getDirectory();

    this.config.http = {
      dir: directory,
      port: +port,
      file: file,
    };
  }

  setHttps() {
    const key = this.parsedOptions.options.key;
    const cert = this.parsedOptions.options.cert;
    this.config.https = {
      key: key,
      cert: cert,
    };
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

  get https() {
    return this.config.https;
  }

  getDirectory() {
    const directory = this.parsedOptions.options.dir
      ? this.parsedOptions.options.dir
      : process.cwd();
    const file = this.parsedOptions.options.file
      ? this.parsedOptions.options.file
      : "index.html";
    if (fileCheckerr.fileGood(directory + "/" + file)) {
      return [directory, file];
    } else {
      throw new Error(
        `File "${directory + "/" + file}" does not exists or is not HTML`
      );
    }
  }
}

module.exports = new Configuration(options);
