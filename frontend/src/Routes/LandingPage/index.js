import React from "react";
import { Redirect } from "react-router-dom";

const LandingPage = () => {
  if (!localStorage.getItem("jwt")) {
    return <Redirect to="/login" />;
  } else {
    return <Redirect to="/home" />;
  }
};

export default LandingPage;
