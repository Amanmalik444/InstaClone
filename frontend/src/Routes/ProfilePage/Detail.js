import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useHistory } from "react-router-dom";
import { Snackbar } from "@material-ui/core";

const Detail = ({
  name,
  userName,
  id,
  bio,
  pic,
  posts,
  setPosts,
  refetch,
  postsFetched,
  setPostsFetched,
}) => {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [posting, setPosting] = useState(false);
  const [loadingValue, setLoadingValue] = useState(0);
  const [messageToShowInSnackBar, setmessageToShowInSnackBar] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const history = useHistory();

  //uploading a new post
  const Upload = (e) => {
    setmessageToShowInSnackBar("Uploading your post, please wait");
    setOpenSnackbar(true);
    setPostsFetched(false);
    setLoading(true);
    setLoadingValue(10);
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "presetIg");
    data.append("cloud_name", "igjmi");
    setLoadingValue(15);
    axios
      .post("https://api.cloudinary.com/v1_1/igjmi/image/upload", data)
      .then((res) => {
        setLoadingValue(65);
        console.log(res.data.url);
        axios
          .post(
            `${process.env.REACT_APP_SERVER_LINK}/post/`,
            {
              userId: id,
              image: res.data.url,
              caption,
              likes: [],
              comments: [],
            },
            {
              headers: {
                Authorization: JSON.parse(localStorage.getItem("jwt")),
              },
            }
          )
          .then((res) => {
            setmessageToShowInSnackBar("Post uploaded, now fetching");
            setOpenSnackbar(true);
            setLoadingValue(100);
            console.log(res.data);
            refetch();
            setPosting(false);
          })
          .catch((err) => {
            setmessageToShowInSnackBar(err.response.data);
            setOpenSnackbar(true);
            console.log(err);
          });

        console.log("uploaded");
        setLoading(false);
        setLoadingValue(100);
      })
      .catch((err) => {
        setmessageToShowInSnackBar(err.response.data);
        setOpenSnackbar(true);
        setLoading(false);
        setLoadingValue(100);
        console.log(err);
      });

    e.target.reset();
  };

  const deleteUser = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/profile/deleteUser`,
        { id },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        setmessageToShowInSnackBar("User deleted");
        setOpenSnackbar(true);
        console.log(res);
        history.push(`/login`);
      })
      .catch((err) => {
        setmessageToShowInSnackBar(err.response.data);
        setOpenSnackbar(true);
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "4%",
        marginRight: "4%",
        borderBottom: "1px solid rgba(0,0,0,0.5)",
        padding: "1vh",
        paddingTop: "13vh",
      }}
    >
      <Snackbar
        autoHideDuration={2200}
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
        src={pic}
        alt="profilePic"
        style={{
          objectFit: "cover",
          height: "30vh",
          width: "30vh",
          borderRadius: "100%",
        }}
      />
      <h1>{name}</h1>
      <h4
        style={{
          color: "rgba(0.5,0.5,0.5,0.5)",
        }}
      >
        {userName}
      </h4>
      {deleting === false ? (
        <Button
          variant="outlined"
          color="primary"
          style={{
            margin: "10px",
            width: "130px",
          }}
          onClick={() => setDeleting(true)}
        >
          {" "}
          Delete user{" "}
        </Button>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            style={{
              margin: "10px",
              width: "130px",
              marginBottom: "5px",
            }}
            onClick={deleteUser}
          >
            confirm
          </Button>
          <Button
            variant="contained"
            color="default"
            style={{
              margin: "10px",
              marginTop: "0px",
            }}
            onClick={() => setDeleting(false)}
          >
            cancel
          </Button>
        </div>
      )}
      <p
        style={{
          marginTop: "2vh",
          marginBottom: "2vh",
        }}
      >
        {" "}
        {bio}{" "}
      </p>

      {posting === true ? (
        <form onSubmit={Upload}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
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
                onChange={(e) => setImage(e.target.files[0])}
                style={{
                  display: "none",
                }}
              />
              <Button
                color="dark"
                variant="outlined"
                component="span"
                style={{
                  margin: "3px",
                  width: "200px",
                  marginTop: "2vh",
                }}
              >
                Select Image
              </Button>
            </label>
            <TextField
              label="Enter Caption"
              variant="outlined"
              onChange={(e) => setCaption(e.target.value)}
              style={{
                margin: "3px",
                marginTop: "1vh",
                marginBottom: "1vh",
                width: "200px",
              }}
            />
            {loading === false && postsFetched === true ? (
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  style={{
                    margin: "3px",
                  }}
                >
                  <InstagramIcon />
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  type="submit"
                  style={{
                    margin: "3px",
                  }}
                  onClick={() => setPosting(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <CircularProgress variant="determinate" value={loadingValue} />
            )}
          </div>
        </form>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          style={{
            margin: "10px",
          }}
          onClick={() => setPosting(true)}
        >
          Post on Instagram
        </Button>
      )}
    </div>
  );
};

export default Detail;
