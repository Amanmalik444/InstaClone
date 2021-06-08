const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/", (req, res) => {
  User.findOne({ userName: req.body.userName })
    .then((user) => {
      if (user) {
        if (bcrypt.compare(req.body.password, user.password)) {
          res.json(user);
        } else {
          res.status(500).json("password did not match");
        }
      } else {
        res.status(500).json("user does not exist");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("trouble reaching the server");
    });
});

module.exports = router;
