/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import DoneAllIcon from "@material-ui/icons/DoneAllRounded";
import axios from "axios";
import "./userCard.css";

const UserCard = ({
  name,
  userName,
  pic,
  bio,
  id,
  loggedInUser,
  followers,
}) => {
  const [followed, setFollowed] = useState(false);

  //getting Follow status
  useEffect(() => {
    followers.includes(loggedInUser._id)
      ? setFollowed(true)
      : setFollowed(false);
  }, []);

  const Follow = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/profile/toggleFollow`,
        {
          userId: loggedInUser._id,
          id,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        setFollowed(!followed);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="userCardComplete">
      <div className="userCard">
        <div>
          <img src={pic} className="userPic" />
        </div>
        <div className="userDetails">
          <h3 className="userUN">{userName}</h3>
          <h5 className="userN">{name}</h5>
          <div>{bio}</div>
        </div>
      </div>
      <Button
        className="userButton"
        variant="contained"
        color="primary"
        onClick={() => Follow()}
      >
        {followed ? <DoneAllIcon /> : "Follow"}
      </Button>
    </div>
  );
};

export default UserCard;
