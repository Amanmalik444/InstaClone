import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Snackbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Comment from "./Comment";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Post.css";

const Post = ({ userId, likes, id, image, caption, refetch, comments }) => {
  const [comment, setComment] = useState("");
  const [edittedCaption, setEdittedCaption] = useState("");
  const [liked, setLiked] = useState(true);
  const [captionEditing, setCaptionEditing] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [messageToShowInSnackBar, setmessageToShowInSnackBar] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  AOS.init({ duration: 2000 });
  //getting like status
  useEffect(() => {
    AOS.init({ duration: 2000 });
    likes.includes(loggedInUser._id) ? setLiked(false) : setLiked(true);
  }, []);

  //editing the caption
  const editCaption = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/post/editCaption`,
        {
          id,
          caption: edittedCaption,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((err) => {
        setmessageToShowInSnackBar(err.response.data);
        setOpenSnackbar(true);
        console.log(err);
      });
    e.target.reset();
    setEdittedCaption("");
    setCaptionEditing(false);
  };

  //deleting the post
  const deletePost = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/post/delete`,
        { id },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        setmessageToShowInSnackBar("Post deleted");
        setOpenSnackbar(true);
        console.log(res);
        refetch();
      })
      .catch((err) => {
        setmessageToShowInSnackBar(err.response.data);
        setOpenSnackbar(true);
        console.log(err);
      });
  };

  //toggle like
  const toggleLike = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/post/toggleLike`,
        {
          userId: loggedInUser._id,
          id,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        console.log(res);
        refetch();
        setLiked(!liked);
      })
      .catch((err) => {
        setmessageToShowInSnackBar(err.response.data);
        setOpenSnackbar(true);
        console.log(err);
      });
  };

  //posting comments
  const postComment = (e) => {
    setmessageToShowInSnackBar("Posting comment");
    setOpenSnackbar(true);
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/post/postComment`,
        {
          userId: loggedInUser._id,
          id,
          comment,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((err) => {
        setmessageToShowInSnackBar(err.response.data);
        setOpenSnackbar(true);
        console.log(err);
      });
    e.target.reset();
    setComment("");
  };

  return (
    <div className="container">
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        message={messageToShowInSnackBar}
      />
      <div
        className="posts"
        data-aos="slide-up"
        data-aos-duration="600"
        data-aos-anchor-placement="bottom"
      >
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
              moreOptions === false ? (
                <MoreVertIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setMoreOptions(true);
                  }}
                />
              ) : (
                <div>
                  <DeleteIcon
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={deletePost}
                  />
                  <EditIcon
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={() => {
                      setCaptionEditing(!captionEditing);
                    }}
                  />
                  <MoreHorizIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setMoreOptions(false);
                    }}
                  />
                </div>
              )
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

          {captionEditing === false ? (
            <div className="bottom">
              <h5 className="userName">
                {userId.userName}
                {" : "}
              </h5>
              <h5 className="caption">{caption}</h5>
            </div>
          ) : (
            <form onSubmit={editCaption}>
              <TextField
                placeholder={caption}
                onChange={(e) => {
                  setEdittedCaption(e.target.value);
                }}
                style={{
                  marginLeft: "2vh",
                  width: "36vh",
                  textAlign: "center",
                  // marginBottom: "1vh",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CancelIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setCaptionEditing(false);
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" style={{ display: "none" }}>
                edit
              </Button>
            </form>
          )}
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
