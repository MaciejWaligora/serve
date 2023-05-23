const Formatter = require("./formatter");
class Log {
  info(...args) {
    let msg = args.map((arg) =>
      typeof arg === "object" ? (arg = JSON.stringify(arg, null, 4)) : arg
    );
    console.log(
      `\x1b[33m ${Formatter.longtTimeStamp(Date.now()) + " [INFO]: "}\x1b[0m`,
      ...msg
    );
  }
  error(...args) {
    let msg = args.map((arg) =>
      typeof arg === "object" ? (arg = JSON.stringify(arg, null, 4)) : arg
    );
    console.log(
      `\x1b[91m ${Formatter.longtTimeStamp(Date.now()) + " [ERR]: "}\x1b[0m`,
      ...msg
    );
  }
}

module.exports = new Log();
