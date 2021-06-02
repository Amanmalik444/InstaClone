const express = require("express");
const User = require("../models/user");
const post = require("../models/post");
const user = require("../models/user");

const router = express.Router();

//get request
router.get("/", (req, res) => {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log("error");
    });
});

//delete user
router.post("/deleteUser", (req, res) => {
  // const deletePost = post.deleteMany({ userId: req.body.id });

  // const deleteLikesComments = post.find().then((posts) => {
  //   posts.forEach((p) => {
  //     p.likes = p.likes.filter((like) => like.toString() !== req.body.id);
  //     p.comments = p.comments.filter(
  //       (comment) => comment.userId.toString() !== req.body.id
  //     );
  //     p.save();
  //   });
  // });

  post
    .deleteMany({ userId: req.body.id })
    .then(() =>
      post.find().then((posts) => {
        posts.forEach((p) => {
          p.likes = p.likes.filter((like) => like.toString() !== req.body.id);
          p.comments = p.comments.filter(
            (comment) => comment.userId.toString() !== req.body.id
          );
          console.log(p);
          p.save();
        });
      })
    )
    .then((p) => {
      user.findByIdAndRemove(req.body.id).then((u) => {
        res.json(p);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

module.exports = router;
