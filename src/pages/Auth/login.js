import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Input from "../../components/Input";
import styled from "@emotion/styled";
import { auth, firestore } from "../../firebase.js";
import UserContext from "../../context/user";
import { Grid, makeStyles } from "@material-ui/core";
import Logo from "../../assets/Jereer-clouds-Ver-Official.png";

const Wrapper = styled("div")`
  display: flex;
`;

const ContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-top: 200px;
`;

function Login() {
  const history = useHistory();
  const [values, setValues] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const [error, setError] = useState("");
  const isInvalid =
    values.password === "" || values.password < 6 || values.email === "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);

      history.push(ROUTES.LANDING);
    } catch (err) {
      setError(err.message);
    }
    setValues({});
  };

  return (
    <UserContext.Provider value={{ loggedInUser }}>
      <Wrapper>
        <ContentWrapper>
          {error && <p>{error}</p>}

          <form onSubmit={handleLogin}>
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
            <button disabled={isInvalid} type="submit">
              Login
            </button>
          </form>
        </ContentWrapper>
      </Wrapper>
    </UserContext.Provider>
  );
}

export default Login;