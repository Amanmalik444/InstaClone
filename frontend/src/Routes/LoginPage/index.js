import React, { useState } from "react";
import Logo from "../../utils/Logo.png";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Snackbar } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageToShowInSnackBar, setmessageToShowInSnackBar] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const history = useHistory();

  const Submit = (e) => {
    setmessageToShowInSnackBar("Logging In");
    setOpenSnackbar(true);
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER_LINK}/login/`, {
        userName,
        password,
      })
      .then((res) => {
        setmessageToShowInSnackBar("logged In");
        setOpenSnackbar(true);
        localStorage.setItem("jwt", JSON.stringify(res.data.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        history.push("/profile");
        setLoading(false);
      })
      .catch((err) => {
        setmessageToShowInSnackBar(err.response.data);
        setOpenSnackbar(true);
        console.log(err);
        setLoading(false);
      });
    console.log("Logged In");
  };

  // if (localStorage.getItem("jwt")) {
  //   return <Redirect to="/profile" />;
  // }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(240, 240, 240)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "450px",
          width: "300px",
          alignItems: "center",
          border: "1px solid rgba(0,0,0,0.2)",
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: "8px 8px 15px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openSnackbar}
          onClose={() => {
            setOpenSnackbar(false);
          }}
          message={messageToShowInSnackBar}
        />
        <img src={Logo} style={{ height: "100px" }} alt="instagram" />
        <form onSubmit={Submit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              label="Enter Username"
              variant="outlined"
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{ margin: "10px" }}
            />
            <TextField
              type="password"
              label="Enter Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ margin: "10px" }}
            />
            {loading === true ? (
              <CircularProgress style={{ margin: "5px" }} />
            ) : (
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                style={{ margin: "10px", width: "210px" }}
              >
                Submit
              </Button>
            )}

            <h5
              style={{
                cursor: "pointer",
                textAlign: "center",
                marginTop: "30px",
              }}
              onClick={() => {
                history.push("/register");
              }}
            >
              New user? Register
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
