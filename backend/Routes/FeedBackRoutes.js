const express = require("express");
const router = express.Router();
const {
  AddFeedback,
  GetFeedBackByProduct,
  GetFeedBackByUser,
} = require("../Controllers/feedbackController");

router.post("/addFeedback", AddFeedback);

router.get("/getFeedBacks/:id", GetFeedBackByProduct);

router.get("/getFeedBacksUser/:id", GetFeedBackByUser);

module.exports = router;
