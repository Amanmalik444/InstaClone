import React, { useState } from "react";
import Logo from "../../utils/Logo.png";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Snackbar } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InsertPhotoIconOutlined from "@material-ui/icons/InsertPhotoOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingValue, setLoadingValue] = useState(0);
  const [messageToShowInSnackBar, setmessageToShowInSnackBar] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const history = useHistory();

  const Submit = (e) => {
    setmessageToShowInSnackBar("Registering");
    setOpenSnackbar(true);
    setLoading(true);
    setLoadingValue(10);
    e.preventDefault();
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "presetIg");
    data.append("cloud_name", "igjmi");
    setLoadingValue(35);
    axios
      .post("https://api.cloudinary.com/v1_1/igjmi/image/upload", data)
      // .then((res) => res.json())

      .then((res) => {
        setLoadingValue(100);
        console.log(res.data.url);
        axios
          .post(`${process.env.REACT_APP_SERVER_LINK}/register/`, {
            name,
            userName,
            email,
            password,
            bio,
            profilePic: res.data.url,
          })
          .then((res) => {
            setLoadingValue(0);
            setLoading(false);
            console.log(res, "registered");
            history.push("/login");
          })
          .catch((err) => {
            setmessageToShowInSnackBar(err.response.data);
            setOpenSnackbar(true);
            console.log(err);
          });
        console.log("uploaded");
      })
      .catch((err) => {
        setmessageToShowInSnackBar(err.response.data);
        setOpenSnackbar(true);
        console.log(err);
        setLoadingValue(0);
        setLoading(false);
      });

    e.target.reset();
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
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
          alignItems: "center",
          width: "350px",
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
        <img
          src={Logo}
          style={{ height: "15vh", marginTop: "2vh" }}
          alt="instagram"
        />
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
                }}
              >
                Profile picture <InsertPhotoIconOutlined />
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

            {loading === true ? (
              <CircularProgress variant="determinate" value={loadingValue} />
            ) : (
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                style={{ margin: "1vh", width: "105px" }}
              >
                Register
              </Button>
            )}

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
