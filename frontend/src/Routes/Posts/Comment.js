import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteIconOutline from "@material-ui/icons/DeleteOutline";
import axios from "axios";
import "./Post.css";

const Comment = ({ comment, loggedInUser, refetch, postId }) => {
  const [deletingComment, setDeletingComment] = useState(false);

  //deleting the comment
  const deleteComment = () => {
    setDeletingComment(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/post/deleteComment`,
        {
          commentId: comment._id,
          postId,
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
        setDeletingComment(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1vh",
          marginRight: "1vh",
          marginLeft: "1vh",
          maxWidth: "38vh",
        }}
      >
        <h5
          style={{
            color: "rgba(0.8,0.8,0.8,0.8)",
            maxWidth: "34vh",
          }}
        >
          {comment.userId.userName} : {comment.text}
        </h5>
        {loggedInUser._id === comment.userId._id ? (
          deletingComment === false ? (
            <DeleteIconOutline
              style={{ cursor: "pointer" }}
              onClick={deleteComment}
            />
          ) : (
            <DeleteIcon style={{ cursor: "pointer" }} onClick={deleteComment} />
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Comment;
