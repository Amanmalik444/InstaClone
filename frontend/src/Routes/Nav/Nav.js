import React, { useState } from "react";
import "./Nav.css";
import Logo from "../../utils/Logo.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import SearchForeverTwoToneIcon from "@material-ui/icons/Search";

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  //checking the user via localstorage
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const history = useHistory();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    setAnchorEl(null);
    history.push(`/login`);
    // axios.defaults.headers.common["Authorization"] = "";
    localStorage.setItem("jwt", "");
    localStorage.setItem("user", "");
  };

  const Profile = () => {
    setAnchorEl(null);
    history.push(`/Profile`);
  };

  return (
    <div className="nav">
      <div
        style={{
          width: "32.5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={Logo}
          className="logo"
          alt="instagram"
          onClick={() => history.push(`/home`)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "35%",
          // height: "10%",
        }}
      >
        <SearchForeverTwoToneIcon
          style={{
            marginRight: "3px",
            marginLeft: "3px",
            // height: "58px",
          }}
        />
        <TextField
          id="filled-search"
          label="Search"
          type="search"
          placeholder="Search by Name, Username or Caption"
          variant="standard"
          onChange={(e) => {
            history.push("/home", { searchValue: e.target.value });
          }}
          style={{
            marginBottom: "17px",
          }}
        />
      </div>
      <div
        style={{
          width: "32.5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={loggedInUser ? loggedInUser.profilePic : ""}
          className="accountPic"
          alt="profilePic"
          onClick={handleClick}
        />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={Profile}>Profile</MenuItem>
        <MenuItem onClick={Logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Nav;
