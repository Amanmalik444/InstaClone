const express = require("express");
const post = require("../models/post");

const router = express.Router();

//get request
router.post("/", (req, res) => {
  post
    .find()
    .populate("userId")
    .populate("comments.userId")
    .sort({ createdAt: "desc" })
    .exec()
    .then((posts) => {
      posts = posts.filter(
        (post) =>
          post.userId._id.toString() === req.body.userId ||
          post.userId.followers.includes(req.body.userId)
      );
      res.json(posts);
    });
});

//get unique user's post
router.post("/getUserPost", (req, res) => {
  post
    .find({ userId: req.body.userId })
    .populate("userId")
    .populate("comments.userId")
    .sort({ createdAt: "desc" })
    .exec()
    .then((post) => {
      res.json(post);
    });
});

//post request
router.post("/newPost", (req, res) => {
  const { userId, image, caption } = req.body;
  const newPost = new post({
    userId,
    image,
    caption,
    likes: [],
    comments: [],
  });
  newPost
    .save()
    .then((p) => {
      res.json(p);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

//delete request
router.post("/delete", (req, res) => {
  post
    .findByIdAndRemove(req.body.id)
    .then((p) => {
      res.json(p);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

//editting caption
router.post("/editCaption", (req, res) => {
  post.findById(req.body.id).then((p) => {
    p.caption = req.body.caption;
    p.save().then((post) => res.json(post));
  });
});

//toggleLike
router.post("/toggleLike", (req, res) => {
  post
    .findById(req.body.id)
    // .populate("likes")
    .then((p) => {
      if (p.likes.includes(req.body.userId)) {
        p.likes = p.likes.filter((like) => like.toString() !== req.body.userId);
        // p={...p, likes: p.likes.filter(like => like!== req.body.userId)}
        // p.likes.pop(req.body.userId)
      } else {
        p.likes.push(req.body.userId);
      }
      p.save().then((post) => res.json(post));
    });
});

//posting comment
router.post("/postComment", (req, res) => {
  post.findById(req.body.id).then((p) => {
    p.comments.push({ userId: req.body.userId, text: req.body.comment });
    p.save().then((post) => res.json(post));
  });
});

//deleting comment
router.post("/deleteComment", (req, res) => {
  post.findById(req.body.postId).then((p) => {
    p.comments = p.comments.filter(
      (comment) => comment._id.toString() !== req.body.commentId
    );
    p.save().then((post) => res.json(post));
  });
});

module.exports = router;
