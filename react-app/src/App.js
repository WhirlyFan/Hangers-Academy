import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Main from "./components/Main"
import { getAllServersThunk } from "./store/server";

import "./index.css";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getAllServersThunk());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <Landing />
        </Route>
        <Route path='/login' exact={true}>
          <Login />
        </Route>
        <ProtectedRoute path='/main'>
          <Main />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
