class Log {
  info(...args) {
    console.log(Date.now(), "[INFO]: ", ...args);
  }
}

module.exports = new Log();
