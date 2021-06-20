import React, { useState, useEffect } from "react";
import Detail from "./Detail";
import axios from "axios";
import Post from "../Posts/Post";
import { Redirect } from "react-router-dom";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [postsFetched, setPostsFetched] = useState(false);

  //checking the user via localstorage
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
        // console.log(res.data);
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
        // console.log(res.data);
        setPosts(res.data);
        setPostsFetched(true);
      });
  };

  if (!localStorage.getItem("jwt")) {
    return <Redirect to="/login" />;
  }

  return (
    <div style={{ marginTop: "0vh" }}>
      <Detail
        name={loggedInUser.name}
        userName={loggedInUser.userName}
        id={loggedInUser._id}
        bio={loggedInUser.bio}
        pic={loggedInUser.profilePic}
        posts={posts}
        setPosts={setPosts}
        refetch={refetch}
        postsFetched={postsFetched}
        setPostsFetched={setPostsFetched}
      />
      <div
        style={{
          marginTop: "7vh",
        }}
      >
        <div style={{ display: "flex", flexFlow: "row wrap" }}>
          {posts.map((post) => (
            <Post
              userId={post.userId}
              image={post.image}
              likes={post.likes}
              caption={post.caption}
              comments={post.comments}
              id={post._id}
              posts={posts}
              setPosts={setPosts}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
