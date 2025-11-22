const express = require("express");
const router = express.Router();

const linkController = require("../controllers/linkController");

// router.post("/", linkController.createLink);
// router.get("/", linkController.getAllLinks);

router
  .route("/")
  .get(linkController.getAllLinks)
  .post(linkController.createLink);

// router.get("/:code", linkController.getLink);
// router.delete("/:code", linkController.deleteLink);

router
  .route("/:code")
  .get(linkController.getLink)
  .delete(linkController.deleteLink);

module.exports = router;
