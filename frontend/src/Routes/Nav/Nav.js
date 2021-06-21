import React, { useState, useEffect } from "react";
import "./Nav.css";
import Logo from "../../utils/Logo.png";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import MenuList from "@material-ui/core/MenuList";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchForeverTwoToneIcon from "@material-ui/icons/Search";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";

const Nav = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //checking the user via localstorage
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();

  const Logout = () => {
    setOpen(false);
    history.push(`/login`);
    localStorage.setItem("jwt", "");
    localStorage.setItem("user", "");
  };

  const Profile = () => {
    setOpen(false);
    history.push(`/Profile`);
  };

  const Follow = () => {
    setOpen(false);
    history.push(`/Follow`);
  };

  return (
    <div className="nav">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "30%",
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
          width: "50%",
        }}
      >
        <TextField
          id="filled-search"
          type="search"
          placeholder="Search Posts"
          variant="standard"
          onChange={(e) => {
            history.push("/home", { searchValue: e.target.value });
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchForeverTwoToneIcon />
              </InputAdornment>
            ),
          }}
          style={{ width: "84%" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "20%",
        }}
      >
        <img
          src={loggedInUser ? loggedInUser.profilePic : ""}
          className="accountPic"
          alt="profilePic"
          ref={anchorRef}
          onClick={handleToggle}
        />
      </div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem
                    onClick={Profile}
                    style={{
                      display: "flex",
                      gap: "10%",
                      width: "108px",
                    }}
                  >
                    <AccountCircleIcon /> Profile
                  </MenuItem>
                  <MenuItem
                    onClick={Follow}
                    style={{
                      display: "flex",
                      gap: "10%",
                      width: "108px",
                    }}
                  >
                    <PersonAddIcon /> Follow
                  </MenuItem>

                  <MenuItem
                    onClick={Logout}
                    style={{
                      display: "flex",
                      gap: "10%",
                      width: "108px",
                      borderTop: "1px solid rgba(100,100,100,0.3)",
                    }}
                  >
                    <ExitToAppIcon />
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default Nav;
