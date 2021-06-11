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
    // tokens: [
    //   {
    //     token: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

// //generating token
// userSchema.methods.generateAuthToken = async function () {
//   try {
//     const generatedToken = jwt.sign(
//       { _id: this._id.toString() },
//       process.env.JWT_SECRET_KEY
//     );
//     this.tokens = this.tokens.concat({ token: generatedToken });
//     await this.save();
//     return generatedToken;
//   } catch (error) {
//     console.log(error);
//   }
// };

//hashing middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

module.exports = mongoose.model("user", userSchema);
