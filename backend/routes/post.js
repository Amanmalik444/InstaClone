const express = require("express");
const post = require("../models/post");

const router = express.Router();

//get request
router.get("/", (req, res) => {
  post
    .find()
    .populate("userId")
    .populate("comments.userId")
    .sort({ createdAt: "desc" })
    .exec()
    .then((post) => {
      res.json(post);
    });
});

//post request
router.post("/", (req, res) => {
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
      console.log(p);
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
        console.log(p.likes, req.body.userId, "before dislike");
        p.likes = p.likes.filter((like) => like.toString() !== req.body.userId);
        // p={...p, likes: p.likes.filter(like => like!== req.body.userId)}
        // p.likes.pop(req.body.userId)
        console.log(p.likes, req.body.userId, "after dislike");
      } else {
        console.log(p.likes, req.body.userId, "before like");
        p.likes.push(req.body.userId);
        console.log(p.likes, req.body.userId, "after like");
      }
      p.save().then((post) => res.json(post));
    });
});

//posting comment
router.post("/postComment", (req, res) => {
  post.findById(req.body.id).then((p) => {
    console.log(p.comments, req.body.userId, "before comment");
    p.comments.push({ userId: req.body.userId, text: req.body.comment });
    console.log(p.comments, req.body.userId, "after comment");
    p.save().then((post) => res.json(post));
  });
});

//deleting comment
router.post("/deleteComment", (req, res) => {
  post.findById(req.body.postId).then((p) => {
    console.log(p.comments, "before deleting");
    p.comments = p.comments.filter(
      (comment) => comment._id.toString() !== req.body.commentId
    );
    console.log(p.comments, "after deleting");
    p.save().then((post) => res.json(post));
  });
});

module.exports = router;
