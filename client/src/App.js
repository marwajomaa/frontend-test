import React, { lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import useAuthListener from "./hooks/auth_listener";
import { getUserByUserId } from "./services/firebase";
import UserContext from "./context/user";
import PrivateRoute from "./helpers/private_routes";
import * as ROUTES from "./constants/routes";
const Login = lazy(() => import("./pages/Auth/login"));
const Signup = lazy(() => import("./pages/Auth/signup"));
const Landing = lazy(() => import("./pages/Landing"));

function App() {
  const { user } = useAuthListener();

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await getUserByUserId(user?.uid);
      await setLoggedInUser(user);
      localStorage.setItem("user", JSON.stringify(userInfo));
    };
    if (user?.uid) {
      getUser();
    }
  }, []);

  if (!loggedInUser) return <h1>Loading...</h1>;

  return (
    <UserContext.Provider value={{ loggedInUser }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} exact component={Login} />
            <Route path={ROUTES.SIGN_UP} exact component={Signup} />
            <PrivateRoute user={user} path={ROUTES.LANDING} exact>
              <Landing />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
