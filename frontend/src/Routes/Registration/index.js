import React, { useState } from "react";
import Logo from "../../utils/Logo.png";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
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
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "presetIg");
    data.append("cloud_name", "igjmi");
    axios
      .post("https://api.cloudinary.com/v1_1/igjmi/image/upload", data)
      // .then((res) => res.json())

      .then((res) => {
        console.log(res.data.url);
        axios
          .post(`${serverLink}/register/`, {
            name,
            userName,
            email,
            password,
            bio,
            profilePic: res.data.url,
          })
          .then((res) => {
            console.log(res, "registered");
            history.push("/login");
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("uploaded");
      })
      .catch((err) => console.log(err));

    e.target.reset();
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgba(0,0,0,0.2)",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <img src={Logo} style={{ height: "15vh" }} alt="instagram" />
        <form onSubmit={Submit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="uploadPhoto">
              <Input
                // label="Enter Image"
                type="file"
                id="uploadPhoto"
                name="image"
                accept="image/*"
                onChange={(e) => setPic(e.target.files[0])}
                style={{
                  display: "none",
                }}
                required
              />
              <Button
                color="dark"
                variant="outlined"
                component="span"
                style={{
                  margin: "1vh",
                  width: "210px",
                  marginTop: "2vh",
                }}
              >
                Select Image
              </Button>
            </label>

            <TextField
              id="outlined-basic"
              label="Enter Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ margin: "1vh", width: "210px" }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Username"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{ margin: "1vh", width: "210px" }}
            />
            <TextField
              id="outlined-basic"
              label="Enter email address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ margin: "1vh", width: "210px" }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ margin: "1vh", width: "210px" }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Bio"
              variant="outlined"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              style={{ margin: "1vh", width: "210px" }}
            />

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              style={{ margin: "1vh", width: "105px" }}
            >
              Register
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
