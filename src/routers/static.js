const express = require("express");
const router = express.Router();
const path = require("path");
const mime = require("mime");

class statRouter {
  constructor(conf) {
    this.router = router;
    this.setupMIMETypes();
    this.setupRouterRootHanlder(conf);
    this.setupRouterCSSHandler(conf);
    this.setupRouterJSHandler(conf);
  }

  getRrouter() {
    return this.router;
  }

  setupRouterRootHanlder(conf) {
    this.router.get("/", (req, res) => {
      try {
        const filePath = path.join(conf.dir, `/${conf.file}`);
        res.status(200);
        res.sendFile(filePath);
      } catch (e) {
        res.status(400);
        res.send("Directory Invalid");
      }
    });
  }

  setupRouterCSSHandler(conf) {
    this.router.use(
      "/static/css",
      express.static(path.join(conf.dir, "/static/css"))
    );
  }

  setupRouterJSHandler(conf) {
    this.router.use(
      "/static/js",
      express.static(path.join(conf.dir, "/static/js"))
    );
  }

  setupMIMETypes() {
    !mime.getType("css") ? mime.define({ "text/css": ["css"] }) : null;
    !mime.getType("js")
      ? mime.define({ "application/javascript": ["js"] })
      : null;
  }
}

module.exports = statRouter;
