import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Posts/Post";
import { useLocation, Redirect } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  const searchValue = location.state ? location.state.searchValue : "";

  // fetching all posts
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_LINK}/post/`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("jwt")),
        },
      })
      .then((res) => setPosts(res.data));
  }, []);

  const searchedPosts = posts.filter(
    (post) =>
      post.userId.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.caption.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.userId.userName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const refetch = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_LINK}/post/`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("jwt")),
        },
      })
      .then((res) => setPosts(res.data));
  };

  if (!localStorage.getItem("jwt")) {
    return <Redirect to="/login" />;
  }

  return (
    <div
      style={{
        paddingTop: "12vh",
      }}
    >
      {searchedPosts.map((post) => (
        <Post
          userId={post.userId}
          image={post.image}
          likes={post.likes}
          caption={post.caption}
          id={post._id}
          posts={posts}
          setPosts={setPosts}
          refetch={refetch}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default HomePage;
