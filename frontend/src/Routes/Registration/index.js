import React, { useState } from "react";
import Logo from "../../utils/Logo.png";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import serverLink from "../../utils/serverLink";
// import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post(`${serverLink}/register/`, {
        name,
        userName,
        email,
        password,
        bio,
        profilePic: pic,
      })
      .then((res) => {
        console.log(res, "registered");
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
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
          height: "96vh",
          width: "60vh",
          alignItems: "center",
          border: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        <img src={Logo} style={{ width: "60%" }} alt="instagram" />
        <form onSubmit={Submit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="outlined-basic"
              label="Enter Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ margin: "10px" }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Username"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{ margin: "10px" }}
            />
            <TextField
              id="outlined-basic"
              label="Enter email address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ margin: "10px" }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ margin: "10px" }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Bio"
              variant="outlined"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              style={{ margin: "10px" }}
            />

            <TextField
              id="outlined-basic"
              label="Profile pic"
              variant="outlined"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
              required
              style={{ margin: "10px" }}
            />

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              style={{ margin: "10px" }}
            >
              Submit
            </Button>
            <h5
              style={{
                cursor: "pointer",
                textAlign: "center",
                marginTop: "1vh",
                marginBottom: "3vh",
              }}
              onClick={() => {
                history.push("/login");
              }}
            >
              Already a user? Login
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
