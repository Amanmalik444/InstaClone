import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import serverLink from "../../utils/serverLink";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

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
  const [loadingValue, setLoadingValue] = useState(0);

  const history = useHistory();

  const Upload = (e) => {
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
          .post(`${serverLink}/post/`, {
            userId: id,
            image: res.data.url,
            caption,
            likes: [],
            comments: [],
          })
          .then((res) => {
            setLoadingValue(100);
            console.log(res.data);
            refetch();
          })
          .catch((err) => {
            console.log(err);
          });

        console.log("uploaded");
        setLoading(false);
        setLoadingValue(100);
      })
      .catch((err) => {
        setLoading(false);
        setLoadingValue(100);
        console.log(err);
      });

    e.target.reset();
  };

  const deleteUser = () => {
    axios
      .post(`${serverLink}/profile/deleteUser`, { id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    history.push(`/login`);
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
        padding: "5vh",
        paddingTop: "13vh",
      }}
    >
      <img
        src={pic}
        alt="profilePic"
        style={{
          objectFit: "cover",
          height: "30vh",
          width: "30vh",
          borderRadius: "100%",
          // marginTop: "8vh",
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
            width: "200px",
          }}
          onClick={() => setDeleting(true)}
        >
          {" "}
          Delete user{" "}
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          style={{
            margin: "10px",
            width: "200px",
          }}
          onClick={deleteUser}
        >
          confirm
        </Button>
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
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              style={{
                width: "100px",
              }}
            >
              Upload
            </Button>
          ) : (
            <CircularProgress variant="determinate" value={loadingValue} />
          )}
        </div>
      </form>
    </div>
  );
};

export default Detail;
