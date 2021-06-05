import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteIconOutline from "@material-ui/icons/DeleteOutline";
import serverLink from "../../utils/serverLink";
import axios from "axios";
import "./Post.css";

const Comment = ({ comment, loggedInUser, refetch, postId }) => {
  const [deletingComment, setDeletingComment] = useState(false);

  //deleting the comment
  const deleteComment = () => {
    setDeletingComment(true);
    axios
      .post(`${serverLink}/post/deleteComment`, {
        commentId: comment._id,
        postId,
      })
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
