import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../../constants/routes";
import { auth, firestore } from "../../firebase";
import { doesUsernameExist } from "../../services/firebase";
import styled from "@emotion/styled";
import Input from "../../components/Input";

function Signup() {
  const history = useHistory();
  const [values, setValues] = useState({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [createdUser, setCreateUser] = useState();
  const [continueSignup, setContinueSignup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const createdUser = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      if (createdUser.user.refreshToken) {
        setContinueSignup(true);
        setCreateUser(createdUser);
      }
      setValues({ ...values, username: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const saveUser = async (e) => {
    console.log(createdUser, "cccccccccccccccccccccccccccccc");
    e.preventDefault();
    const newUser = {
      userId: createdUser.user.uid,
      username: values.username.toLowerCase(),
      emailAddress: values.email.toLowerCase(),
      phoneNumber: values.phoneNum,
      password: values.password,
      token: createdUser.user.refreshToken,
    };

    console.log(newUser, "uuuuuuuuuuuuuuuuuuuuuuuuuuuser");

    try {
      const newLocal = `${process.env.REACT_APP_LOCAL_URL}/api/users/save-user`;
      const res = await axios.post(newLocal, newUser);
      console.log(res);
      setMsg(res.data.msg);
      history.push(ROUTES.LANDING);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Sign up</h3>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {msg && <p>{msg}</p>}
        {!continueSignup && (
          <form onSubmit={handleSignUp}>
            <Input
              aria-label="Enter your email address"
              name="email"
              type="email"
              placeholder="Email address"
              onChange={(e) => handleInputChange(e)}
              value={values.email}
            />
            <Input
              aria-label="Enter your password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleInputChange(e)}
              value={values.password}
            />
            <button type="submit">continue</button>
          </form>
        )}
      </div>
      {continueSignup && (
        <form onSubmit={saveUser}>
          <>
            <Input
              aria-label="Enter your username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={(e) => handleInputChange(e)}
              value={values.username}
            />
            <Input
              aria-label="Enter your phone number"
              name="phoneNum"
              type="text"
              placeholder="Phone number"
              onChange={(e) => handleInputChange(e)}
              value={values.phoneNum}
            />
            <button>Signup</button>
          </>
        </form>
      )}
    </div>
  );
}

export default Signup;
