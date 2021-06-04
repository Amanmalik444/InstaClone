import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { useHistory } from "react-router-dom";
import serverLink from "../../utils/serverLink";
import { createMuiTheme } from "@material-ui/core/styles";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

const Detail = ({ name, userName, id, bio, pic, posts, setPosts, refetch }) => {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const history = useHistory();

  const Upload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "presetIg");
    data.append("cloud_name", "igjmi");
    axios
      .post("https://api.cloudinary.com/v1_1/igjmi/image/upload", data)
      // .then((res) => res.json())

      .then((res) => {
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
            console.log(res.data);
            refetch();
          })
          .catch((err) => {
            console.log(err);
          });

        console.log("uploaded");
      })
      .catch((err) => console.log(err));

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
      <Button
        variant="outlined"
        color="primary"
        style={{
          margin: "10px",
          width: "200px",
        }}
        onClick={deleteUser}
      >
        {" "}
        Delete user{" "}
      </Button>
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
              width: "200px",
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            style={{
              margin: "10px",
              width: "100px",
            }}
          >
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Detail;
