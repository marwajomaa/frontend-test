import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, auth } from "./firebase";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, auth }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
