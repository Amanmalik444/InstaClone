const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
