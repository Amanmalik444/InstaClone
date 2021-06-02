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
  newUser
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

module.exports = router;