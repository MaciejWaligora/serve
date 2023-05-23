const path = require("path");
const Getopt = require("node-getopt");
const Log = require("./logger");
const util = require("util");
const Validator = require("./validator");
const Formatter = require("./formatter");
const FileConf = require("./confLoader");

const options = new Getopt([
  ["h", "help", "Display help"],
  ["p", "port=", "Specify serving port"],
  ["d", "dir=", "Specify serving directory"],
  ["f", "file=", "Specify entry html file"],
  ["h", "https=", "set https"],
  ["k", "key=", "set https key file"],
  ["c", "cert=", "set https cert file"],
]);

class Configuration {
  constructor(globdir) {
    try {
      this.parsedOptions = options.parseSystem();
      this.defaultConfig = new FileConf(globdir, process.cwd()).getConfig();
      this.overWriteConfig = { http: this.setHttp() };
      this.parsedOptions.options.https === "true"
        ? (this.overWriteConfig.https = this.setHttps())
        : null;
      this.config = FileConf.mergeConfigs(
        this.defaultConfig,
        this.overWriteConfig
      );
      Log.info(
        "Loaded configuration:\n",
        util.inspect(Formatter.flattenObject(this.config), {
          depth: null,
          colors: true,
        })
      );
    } catch (e) {
      Log.error("Failed To load Configuration: ", e.message);
      Log.error("Exiting...");
      process.exit(0);
    }
  }

  setHttp() {
    const port = this.parsedOptions.options.port
      ? this.parsedOptions.options.port
      : this.defaultConfig.http.port;

    const [directory, file] = this.getDirectory();

    return {
      dir: directory,
      port: +port,
      file: file,
    };
  }

  setHttps() {
    const key = this.parsedOptions.options.key;
    const cert = this.parsedOptions.options.cert;
    return {
      status: true,
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
      : this.defaultConfig.http.file;
    if (Validator.fileGood(directory + "/" + file, "html")) {
      return [directory, file];
    } else {
      throw new Error(
        `File "${directory + "/" + file}" does not exists or is not HTML`
      );
    }
  }
}

module.exports = Configuration;
