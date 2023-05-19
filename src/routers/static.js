const express = require("express");
const config = require("../options/params.js");
const router = express.Router();
const path = require("path");
const mime = require("mime");

if (!mime.getType("css")) {
  mime.define({
    "text/css": ["css"],
  });
}

if (!mime.getType("js")) {
  mime.define({
    "application/javascript": ["js"],
  });
}

router.get("/", (req, res) => {
  const filePath = path.join(config.http.dir, "/index.html");
  res.sendFile(filePath);
});

router.use((req, res, next) => {
  console.log("Time: ", Date.now(), "IP:", req.ip);
  next();
});

router.use(
  "/static/css",
  express.static(path.join(config.http.dir, "/static/css"))
);
router.use(
  "/static/js",
  express.static(path.join(config.http.dir, "/static/js"))
);

module.exports = router;
