const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      ref: "user",
    },
    image: {
      type: String,
    },
    likes: [
      {
        type: schema.Types.ObjectId,
        ref: "user",
      },
    ],
    caption: {
      type: String,
    },
    comments: [
      {
        userId: {
          type: schema.Types.ObjectId,
          ref: "user",
        },
        text: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
