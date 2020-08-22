import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./containers/sidebar/Sidebar";
import Header from "./containers/header/Header";
import Chat from "./containers/chat/Chat";

import "./app.css";
import Login from "./containers/login/Login";
import { useStateValue } from "./store/stateProvider";

const App = () => {
  // const [user, setUser] = useState(null);
  const [{ user }] = useStateValue(); // destructure user from state

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="app-body">
              {/* Sidebar */}
              <Sidebar />
              {/* React router */}
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <h1>Home Page </h1>
                </Route>
                <Route />
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
