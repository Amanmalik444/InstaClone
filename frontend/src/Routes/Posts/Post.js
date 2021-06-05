import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Comment from "./Comment";
import axios from "axios";
import serverLink from "../../utils/serverLink";
import "./Post.css";

const Post = ({ userId, likes, id, image, caption, refetch, comments }) => {
  const [liked, setLiked] = useState(true);
  const [comment, setComment] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  //deleting the post
  const deletePost = () => {
    axios
      .post(`${serverLink}/post/delete`, { id })
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((err) => console.log(err));
  };

  //getting like status
  useEffect(() => {
    likes.includes(loggedInUser._id) ? setLiked(false) : setLiked(true);
  }, []);

  //toggle like
  const toggleLike = () => {
    axios
      .post(`${serverLink}/post/toggleLike`, {
        userId: loggedInUser._id,
        id,
      })
      .then((res) => {
        console.log(res);
        refetch();
        setLiked(!liked);
      })
      .catch((err) => console.log(err));
  };

  //posting comments
  const postComment = (e) => {
    e.preventDefault();
    axios
      .post(`${serverLink}/post/postComment`, {
        userId: loggedInUser._id,
        id,
        comment,
      })
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((err) => console.log(err));
    e.target.reset();
    setComment("");
  };

  return (
    <div className="container">
      <div className="posts">
        <div className="post">
          <div className="header">
            <div className="picName">
              <img
                src={userId.profilePic}
                className="accPic"
                alt="profilePic"
              />
              <h3 className="name">{userId.name}</h3>
            </div>
            {loggedInUser._id === userId._id ? (
              <DeleteIcon style={{ cursor: "pointer" }} onClick={deletePost} />
            ) : (
              ""
            )}
          </div>
          <img
            src={image}
            alt="postImage"
            className="image"
            onDoubleClick={toggleLike}
          />
          <div className="likes">
            {liked ? (
              <FavoriteBorderIcon
                color="default"
                style={{ cursor: "pointer" }}
                onClick={toggleLike}
              />
            ) : (
              <FavoriteIcon
                color="error"
                style={{ cursor: "pointer" }}
                onClick={toggleLike}
              />
            )}
            <p className="likeNumber">likes : {likes.length}</p>
          </div>

          <div className="bottom">
            <h5 className="userName">
              {userId.userName}
              {" : "}
            </h5>
            <h5 className="caption">{caption}</h5>
          </div>
          {comments.map((comm) => (
            <Comment
              comment={comm}
              loggedInUser={loggedInUser}
              postId={id}
              refetch={refetch}
            />
          ))}
          <form onSubmit={postComment}>
            <div className="commenttingBox">
              <TextField
                label="Enter Comment"
                variant="standard"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  // marginLeft: "1",
                  marginBottom: "1vh",
                }}
              />
              {comment !== "" ? (
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  style={{
                    marginTop: "1vh",
                    marginRight: "10px",
                  }}
                >
                  <SendIcon color="default" />
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="default"
                  style={{
                    marginTop: "1vh",
                    marginRight: "10px",
                  }}
                >
                  <SendIcon color="default" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
