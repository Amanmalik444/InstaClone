import React, { useState, useEffect } from "react";
import Detail from "./Detail";
import axios from "axios";
import Post from "../Posts/Post";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [postsFetched, setPostsFetched] = useState(false);

  // fetching all posts
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_LINK}/post/`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("jwt")),
        },
      })
      .then((res) => {
        // console.log(res.data);
        setPosts(res.data);
        setPostsFetched(true);
      });
  }, []);

  const refetch = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_LINK}/post/`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("jwt")),
        },
      })
      .then((res) => {
        setPosts(res.data);
        setPostsFetched(true);
      });
  };

  //checking the user via localstorage
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const PostsToShow = posts.filter(
    (post) => post.userId._id === loggedInUser._id
  );

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
        {PostsToShow.map((post) => (
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
  );
};

export default Profile;
