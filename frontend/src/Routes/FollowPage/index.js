import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./userCard";
import CircularProgress from "@material-ui/core/CircularProgress";

const FollowPage = () => {
  const [users, setUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);
  // const [usersToShow, setUsersToShow] = useState([]);

  // fetching all users
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_LINK}/profile/`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("jwt")),
        },
      })
      .then((res) => {
        setUsers(res.data);
        setUsersFetched(true);
      });
  }, []);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const usersToShow = users.filter((user) => user._id !== loggedInUser._id);

  return (
    <div className="container" style={{ paddingTop: "80px" }}>
      {usersFetched ? (
        <div>
          {usersToShow.map((user) => (
            <UserCard
              name={user.name}
              userName={user.userName}
              bio={user.bio}
              pic={user.profilePic}
              id={user._id}
              user={user}
              loggedInUser={loggedInUser}
              followers={user.followers}
            />
          ))}
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default FollowPage;
