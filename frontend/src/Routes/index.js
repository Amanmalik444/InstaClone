import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import Login from "./LoginPage";
import Register from "./Registration";
import Nav from "./Nav/Nav";

const Routes = () => {
  return (
    <Router>
      <Route path={["/home","/profile"]} component={Nav} />
      <Switch>
            <Route path="/home" exact component={HomePage} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/Profile" exact component={ProfilePage} />
      </Switch>
    </Router>
  );
};

export default Routes;
