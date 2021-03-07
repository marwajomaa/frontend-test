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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const usernameExists = await doesUsernameExist(values.username);
    if (!usernameExists.length) {
      const createdUser = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      await createdUser.user.updateProfile({
        displayName: values.username,
      });

      const newUser = {
        userId: createdUser.user.uid,
        username: values.username.toLowerCase(),
        emailAddress: values.email.toLowerCase(),
        phoneNumber: values.phoneNum,
        password: values.password,
        token: createdUser.user.refreshToken,
      };

      await firestore.collection("users").add(newUser);
      try {
        const newLocal = `${process.env.REACT_APP_LOCAL_URL}/api/users/save-user`;
        const res = await axios.post(newLocal, newUser);
        console.log(res);
      } catch (err) {
        setError(err.message);
      }
      history.push(ROUTES.LANDING);
    } else {
      setValues({ ...values, username: "" });
      setError("That username is already taken, please try another.");
    }
  };

  return (
    <div>
      <div>
        {error && <p>{error}</p>}

        <form onSubmit={handleSignUp}>
          <Input
            aria-label="Enter your username"
            name="username"
            type="text"
            placeholder="Username"
            onChange={(e) => handleInputChange(e)}
            value={values.username}
          />
          <Input
            aria-label="Enter your email address"
            name="email"
            type="email"
            placeholder="Email address"
            onChange={(e) => handleInputChange(e)}
            value={values.email}
          />
          <Input
            aria-label="Enter your phone number"
            name="phoneNum"
            type="text"
            placeholder="Phone number"
            onChange={(e) => handleInputChange(e)}
            value={values.phoneNum}
          />
          <Input
            aria-label="Enter your password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleInputChange(e)}
            value={values.password}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
