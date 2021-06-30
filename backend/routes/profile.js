const express = require("express");
const User = require("../models/user");
const post = require("../models/post");
const user = require("../models/user");

const router = express.Router();

//get request
router.get("/", (req, res) => {
  User.find()
    // .populate("followers")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete user
router.post("/deleteUser", (req, res) => {
  post.deleteMany({ userId: req.body.id }).then(() => {
    post
      .find()
      .then((posts) => {
        posts.forEach((p) => {
          p.likes = p.likes.filter((like) => like.toString() !== req.body.id);
          p.comments = p.comments.filter(
            (comment) => comment.userId.toString() !== req.body.id
          );
          p.save();
        });
        user
          .find()
          .then((users) => {
            users.forEach((u) => {
              u.followers = u.followers.filter(
                (follower) => follower.toString() !== req.body.id
              );
              u.save();
            });
            user.findByIdAndRemove(req.body.id).then(() => {
              res.json(200);
              console.log("User deleted");
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json("Can't delete user");
          });
      })
      .catch((err) => {
        console.log("error");
        res.status(500).json("An error occurred");
      });
  });
});

//toggle follow
router.post("/toggleFollow", (req, res) => {
  user
    .findById(req.body.id)
    // .populate("likes")
    .then((u) => {
      if (u.followers.includes(req.body.userId)) {
        u.followers = u.followers.filter(
          (like) => like.toString() !== req.body.userId
        );
      } else {
        u.followers.push(req.body.userId);
      }
      u.save().then((us) => res.json(us));
    });
});

module.exports = router;
