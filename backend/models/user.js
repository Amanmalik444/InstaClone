const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    followers: [
      {
        type: schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

//hashing middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

module.exports = mongoose.model("user", userSchema);
