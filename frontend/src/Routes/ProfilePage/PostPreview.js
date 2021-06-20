import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import AOS from "aos";
import "./PostPreview.css";
import "aos/dist/aos.css";

const PostPreview = ({
  userId,
  likes,
  id,
  image,
  refetch,
  post,
  comments,
  RedirectToPost,
}) => {
  return (
    <div
      className="postPreview"
      onClick={() => {
        RedirectToPost(post);
      }}
    >
      <div className="previewDetails">
        <h2>
          <FavoriteIcon fontSize="small" /> {likes.length}
        </h2>
        <h2>
          <ModeCommentIcon fontSize="small" /> {comments.length}
        </h2>
      </div>
      <img src={image} alt="postImage" className="previewImage" />
    </div>
  );
};

export default PostPreview;
