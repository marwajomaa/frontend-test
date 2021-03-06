import React, { lazy, Suspense } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import * as ROUTES from "./constants/routes";
const Login = lazy(() => import("./pages/Auth/login"));
const Signup = lazy(() => import("./pages/Auth/signup"));
const Landing = lazy(() => import("./pages/Landing"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} exact component={Login} />
          <Route path={ROUTES.SIGN_UP} exact component={Signup} />
          <Route path={ROUTES.LANDING} exact component={Landing} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
