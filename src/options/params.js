const path = require("path");
const Getopt = require("node-getopt");

const options = new Getopt([
  ["h", "help", "Display help"],
  ["p", "port=", "Specify serving port"],
  ["d", "dir=", "Specify serving directory"],
]);

console.log(process.cwd());

const parsedOptions = options.parseSystem();
const directory = parsedOptions.options.dir
  ? parsedOptions.options.dir
  : process.cwd();
const port = parsedOptions.options.port ? parsedOptions.options.port : 3000;

const config = {
  http: {
    port: +port,
    dir: directory,
  },
};

module.exports = config;
