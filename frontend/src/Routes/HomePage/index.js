import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Posts/Post";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLocation, Redirect } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [postsFetched, setPostsFetched] = useState(false);
  const location = useLocation();

  const searchValue = location.state ? location.state.searchValue : "";
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  // fetching all posts
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/post/`,
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
        paddingTop: "15vh",
      }}
      data-aos="slide-right"
      data-aos-duration="600"
      data-aos-anchor-placement="bottom"
    >
      {postsFetched ? (
        searchedPosts.map((post) => (
          <div style={{ marginBottom: "70px" }}>
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
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default HomePage;
