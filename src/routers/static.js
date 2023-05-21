const express = require("express");
const router = express.Router();
const path = require("path");
const mime = require("mime");
const log = require("../utils/logger");
const net = require("net");

class statRouter {
  constructor(conf) {
    !mime.getType("css") ? mime.define({ "text/css": ["css"] }) : null;
    !mime.getType("js")
      ? mime.define({ "application/javascript": ["js"] })
      : null;

    this.router = router;
    this.router.get("/", (req, res) => {
      const filePath = path.join(conf.dir, `/${conf.file}`);
      res.sendFile(filePath);
    });
    this.router.use((req, res, next) => {
      const ipAddress = req.ip.includes("::ffff:") ? req.ip.slice(7) : req.ip;
      const formattedIpAddress = net.isIPv6(ipAddress)
        ? `[${ipAddress}]`
        : ipAddress;
      log.info(formattedIpAddress);
      next();
    });

    this.router.use(
      "/static/css",
      express.static(path.join(conf.dir, "/static/css"))
    );
    this.router.use(
      "/static/js",
      express.static(path.join(conf.dir, "/static/js"))
    );
  }

  getRrouter() {
    return this.router;
  }
}

module.exports = statRouter;
