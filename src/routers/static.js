const express = require("express");
const router = express.Router();
const path = require("path");
const mime = require("mime");
const log = require("../utils/logger");

class statRouter {
  constructor(conf) {
    !mime.getType("css") ? mime.define({ "text/css": ["css"] }) : null;
    !mime.getType("js")
      ? mime.define({ "application/javascript": ["js"] })
      : null;

    this.router = router;
    this.router.get("/", (req, res) => {
      const filePath = path.join(conf.dir, "/index.html");
      res.sendFile(filePath);
    });
    this.router.use((req, res, next) => {
      log.info(req.ip);
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
