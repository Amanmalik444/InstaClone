import React, { useState, useEffect } from "react";
import Detail from "./Detail";
import axios from "axios";
import PostPreview from "./PostPreview";
import Post from "../Posts/Post";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [postsFetched, setPostsFetched] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [postToShow, setPostToShow] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  // fetching all posts
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/post/getUserPost`,
        { userId: loggedInUser._id },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        setPosts(res.data);
        setPostsFetched(true);
      });
  }, []);

  const refetch = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/post/getUserPost`,
        { userId: loggedInUser._id },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        setPosts(res.data);
        setPostsFetched(true);
        setPostToShow(
          ...res.data.filter((post) => post._id === postToShow._id)
        );
      });
  };

  const RedirectToPost = (post) => {
    setShowPost(true);
    setPostToShow(post);
  };

  const afterDelete = () => {
    setShowPost(false);
  };

  // if (!localStorage.getItem("jwt")) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {showPost ? (
        <div
          style={{
            marginTop: "19vh",
            position: "fixed",
            zIndex: "1000",
          }}
        >
          <Post
            userId={postToShow.userId}
            image={postToShow.image}
            likes={postToShow.likes}
            comments={postToShow.comments}
            caption={postToShow.caption}
            id={postToShow._id}
            setPosts={setPosts}
            refetch={refetch}
            posts={posts}
            afterDelete={afterDelete}
          />
        </div>
      ) : (
        ""
      )}
      <div
        onClick={() => {
          if (showPost) setShowPost(!showPost);
        }}
        className={showPost ? "reducedOpacity" : ""}
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <Detail
          name={loggedInUser.name}
          userName={loggedInUser.userName}
          id={loggedInUser._id}
          bio={loggedInUser.bio}
          pic={loggedInUser.profilePic}
          followers={loggedInUser.followers}
          posts={posts}
          setPosts={setPosts}
          refetch={refetch}
          postsFetched={postsFetched}
          setPostsFetched={setPostsFetched}
        />
        <div className="previews">
          {postsFetched ? (
            <div className="previewsSubContainer">
              {posts.map((post) => (
                <PostPreview
                  userId={post.userId}
                  image={post.image}
                  likes={post.likes}
                  comments={post.comments}
                  id={post._id}
                  posts={posts}
                  post={post}
                  refetch={refetch}
                  RedirectToPost={RedirectToPost}
                />
              ))}
            </div>
          ) : (
            <CircularProgress
              style={{ marginTop: "5vh", marginBottom: "5vh" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
