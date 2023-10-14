const mongooes = require("mongoose");

const Schema = mongooes.Schema;

const FeedBackSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    productID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add timestamps option
  }
);

module.exports = mongooes.model("Feedbacks", FeedBackSchema);
