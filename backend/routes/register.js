const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, userName, email, password, profilePic, bio } = req.body;
  const newUser = new User({
    name,
    userName,
    email,
    password,
    profilePic,
    bio,
  });

  // const token = newUser.generateAuthToken();

  newUser
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error occured");
    });
});

module.exports = router;
