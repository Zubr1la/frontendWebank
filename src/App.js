import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NotFound from "./Routes/NotFound";
import Login from "./Routes/Login";
import Main from "./Routes/Main";
import NavBar from "./Components/NavBar";
import Register from "./Routes/Register";
import UserSettings from "./Routes/UserSettings";
import Payment from "./Routes/Payment";


function App() {
  return (
      <Router>
        <div>

            <NavBar/>
          <Switch>

                <Route exact path="/">
                  <Login />
                </Route>
              <Route exact path="/main">
                  <Main />
              </Route>
              <Route exact path="/register">
                  <Register />
              </Route>
              <Route exact path="/usersettings">
                  <UserSettings />
              </Route>

              <Route path="/payment/:id/:balance/:bank/"

                     component={Payment}>

              </Route>


            <Route component={NotFound}/>
          </Switch>

        </div>
      </Router>
  );
}

export default App;
