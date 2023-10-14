const Feedbacks = require("../Models/FeedBackSchema");

const AddFeedback = async (req, res) => {
  const { userID, userName, productID, comment } = req.body;

  try {
    const feedback = new Feedbacks({ userID, userName, productID, comment });
    const result = await feedback.save();

    if (result) {
      res.status(200).send("Feedback saved successfully");
    } else {
      res.status(400).send("faild");
    }
  } catch (err) {
    console.error(err);
  }
};

const GetFeedBackByProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const feedbacks = await Feedbacks.find({ productID: id });

    if (feedbacks && feedbacks.length > 0) {
      res.status(200).json({ feedbacks });
    } else {
      res
        .status(404)
        .json({ error: "No feedback found for the specified product ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while fetching feedback" });
  }
};

const GetFeedBackByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const feedbacks = await Feedbacks.find({ userID: id });

    if (feedbacks && feedbacks.length > 0) {
      res.status(200).json({ feedbacks });
    } else {
      res
        .status(404)
        .json({ error: "No feedback found for the specified user ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while fetching feedback" });
  }
};

module.exports = { AddFeedback, GetFeedBackByProduct, GetFeedBackByUser };
