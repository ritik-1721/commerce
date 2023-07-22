const { staticImage } = require("../controllers/static.controllers");
const router = require("express").Router();
router.get("/images/:image", staticImage);
module.exports = router;
