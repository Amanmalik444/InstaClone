import React, { useState } from "react";
import Logo from "../../utils/Logo.png";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import serverLink from "../../utils/serverLink";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const Submit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${serverLink}/login/`, { userName, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        history.push("/profile");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    console.log("Logged In");
  };

  return (
    <div
      style={{
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "10vh",
          height: "80%",
          width: "40vh",
          alignItems: "center",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        <img src={Logo} style={{ width: "60%" }} alt="instagram" />
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
              id="outlined-basic"
              label="Enter Username"
              variant="outlined"
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{ margin: "10px" }}
            />
            <TextField
              id="outlined-basic"
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
                marginTop: "1vh",
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
