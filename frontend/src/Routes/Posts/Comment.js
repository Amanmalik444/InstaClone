import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import serverLink from "../../utils/serverLink";
import axios from "axios";
import "./Post.css";

const Comment = ({ comment, loggedInUser, refetch, postId }) => {
  //deleting the comment
  const deleteComment = () => {
    axios
      .post(`${serverLink}/post/deleteComment`, {
        commentId: comment._id,
        postId,
      })
      .then((res) => {
        console.log(res);
        refetch();
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
          marginTop: "1vh",
          marginRight: "1vh",
          marginLeft: "1vh",
        }}
      >
        <h5 style={{ color: "rgba(0.8,0.8,0.8,0.8)" }}>
          {comment.userId.userName} : {comment.text}
        </h5>
        {loggedInUser._id === comment.userId._id ? (
          <DeleteIcon style={{ cursor: "pointer" }} onClick={deleteComment} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Comment;
