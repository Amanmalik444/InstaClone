import React, { useState } from "react";
import "./Nav.css";
import Logo from "../../utils/Logo.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
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
    localStorage.clear();
  };

  const Profile = () => {
    setAnchorEl(null);
    history.push(`/Profile`);
  };

  return (
    <div className="nav">
      <img
        src={Logo}
        className="logo"
        alt="instagram"
        onClick={() => history.push(`/home`)}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "50%",
          marginLeft: "4vh",
        }}
      >
        <SearchForeverTwoToneIcon
          style={{
            marginTop: "24px",
            marginRight: "5px",
            marginLeft: "3px",
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
            marginTop: "2px",
          }}
        />
      </div>

      {/* <AccountCircleIcon className="account" onClick={handleClick} /> */}
      <img
        src={loggedInUser.profilePic}
        className="accountPic"
        alt="profilePic"
        onClick={handleClick}
      />
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
