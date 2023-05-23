const fs = require("fs");
const path = require("path");
const Validator = require("./validator");
const Log = require("./logger");

class ConfFileLoader {
  constructor(globalDir, localDir) {
    try {
      this.globalDir = globalDir;
      this.globalDefaultDir = this.listFilesAndDirectories(globalDir);
      this.localDir = this.listFilesAndDirectories(localDir);
      this.globalDefaultConfig = this.parseConfigFile(this.globalDefaultDir);
      if (this.localDir) {
        this.localConfig = this.parseConfigFile(this.localDir);
        this.config = ConfFileLoader.mergeConfigs(
          this.globalDefaultConfig,
          this.localConfig
        );
        Log.info("Loading local serve configuration from: " + this.localDir);
      } else {
        this.config = this.globalDefaultConfig;
        Log.info("Loading default global serve configuration");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }
  listFilesAndDirectories(directoryPath) {
    try {
      const filesAndDirectories = fs.readdirSync(directoryPath);

      for (const fileOrDir of filesAndDirectories) {
        const fullPath = path.join(directoryPath, fileOrDir);
        const stats = fs.statSync(fullPath);

        if (stats.isFile()) {
          if (fileOrDir === "serve.conf") {
            return fullPath; // Return the path when the file is found
          }
        } else if (stats.isDirectory()) {
          const foundPath = this.listFilesAndDirectories(fullPath); // Recursively search in subdirectories

          if (foundPath) {
            return foundPath; // Return the path if found in a subdirectory
          }
        }
      }
    } catch (err) {
      throw new Error("Could not load configuration file", err.message);
    }
  }
  parseConfigFile(dir) {
    if (Validator.fileGood(dir, "conf")) {
      const fileBuff = fs.readFileSync(dir);
      return JSON.parse(fileBuff.toString());
    } else {
      this.createDefaultConfigFile();
      const fileBuff = fs.readFileSync(this.globalDefaultDir);
      return JSON.parse(fileBuff.toString());
    }
  }
  createDefaultConfigFile() {
    let defaultConfig = {
      http: {
        port: 3000,
        file: "index.html",
      },
      https: {
        status: false,
      },
    };
    fs.writeFileSync(
      this.globalDir + "/serve.conf",
      JSON.stringify(defaultConfig, null, 2)
    );
    this.globalDefaultDir = this.listFilesAndDirectories(this.globalDir);
    Log.info("Created default serve.conf file at: " + this.globalDir);
  }
  static mergeConfigs(obj1, obj2) {
    const merged = { ...obj1 };

    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        if (typeof obj2[key] === "object" && !Array.isArray(obj2[key])) {
          if (typeof merged[key] === "object" && !Array.isArray(merged[key])) {
            merged[key] = this.mergeConfigs(merged[key], obj2[key]);
          } else {
            merged[key] = { ...obj2[key] };
          }
        } else {
          merged[key] = obj2[key];
        }
      }
    }
    return merged;
  }
  getConfig() {
    return this.config;
  }
}

module.exports = ConfFileLoader;
