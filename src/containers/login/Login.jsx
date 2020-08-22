import React from "react";
import { Button } from "@material-ui/core";

import "./Login.css";
import { auth, provider } from "../../firebase/firebase";
import { useStateValue } from "../../store/stateProvider";
import { actionTypes } from "../../store/actions";

const Login = () => {
  const [, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({ type: actionTypes.SET_USER, user: result.user })
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-4nzzs1/Slack_Mark_Web.png"
          alt=""
        />
        <h2>Sign in to your workspace</h2>
        <p>yourworkspace.slack.com</p>
        <Button onClick={signIn}>Google Sign In</Button>
      </div>
    </div>
  );
};

export default Login;
