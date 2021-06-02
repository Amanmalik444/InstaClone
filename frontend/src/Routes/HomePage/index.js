import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Posts/Post";
import { useLocation } from "react-router-dom";
import serverLink from "../../utils/serverLink";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  const searchValue = location.state ? location.state.searchValue : "";

  // fetching all posts
  useEffect(() => {
    axios.get(`${serverLink}/post/`).then((res) => setPosts(res.data));
  }, []);

  useEffect(() => {
    axios.get(`${serverLink}/post/`).then((res) => setPosts(res.data));
  }, []);

  const searchedPosts = posts.filter(
    (post) =>
      post.userId.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.caption.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.userId.userName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const refetch = () => {
    axios.get(`${serverLink}/post/`).then((res) => setPosts(res.data));
  };

  return (
    <div>
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
