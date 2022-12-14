import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import { getAllServersThunk } from "./store/server";

import "./index.css";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const data = await dispatch(authenticate());
      if (!data) {
        setAuthenticated(true);
      }
      if (authenticated) {
        await dispatch(getAllServersThunk());
      }
      setLoaded(true);
    })();
  }, [dispatch, authenticated]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Landing />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/signup" exact={true}>
          <Signup />
        </Route>
        <ProtectedRoute path="/main">
          <Main />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
