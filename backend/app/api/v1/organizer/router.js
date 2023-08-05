const express = require("express");
const router = express();
const {
  createCMSOrganizer,
  createCMSUser,
  getCMSUsers,
} = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

const upload = require("../../../middlewares/multer");

router.post(
  "/organizer",
  authenticateUser,
  authorizeRoles("owner"),
  createCMSOrganizer
);
router.post(
  "/users",
  authenticateUser,
  authorizeRoles("organizer"),
  createCMSUser
);
router.get("/users", authenticateUser, authorizeRoles("owner"), getCMSUsers);

module.exports = router;
