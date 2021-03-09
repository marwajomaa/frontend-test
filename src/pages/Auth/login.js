import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../../constants/routes";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { auth } from "../../firebase.js";
import UserContext from "../../context/user";
import Logo from "../../assets/jereer-logo.png";
import {
  Wrapper,
  ContentWrapper,
  LogoWrapper,
  InputDiv,
  Paragraph,
} from "./style.js";

function Login() {
  const history = useHistory();
  const [values, setValues] = useState({});
  const [loggedInUser] = useState({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
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

      const currentUser = await auth.currentUser;
      if (currentUser) {
        try {
          const user = await axios.get(
            `${process.env.REACT_APP_LOCAL_URL}/api/users/user/${currentUser.user.uid}`
          );
          if (user) {
            localStorage.setItem("user", JSON.stringify(user.data));
            setMsg(user.msg);
          }
        } catch (err) {
          setError(err.message);
        }
      }

      history.push(ROUTES.LANDING);
    } catch (err) {
      setError(err.message);
    }
    setValues({});
  };

  useEffect(() => {
    document.title = "Login | Jereer";
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser }}>
      <Wrapper>
        <LogoWrapper>
          <img
            src={Logo}
            alt="Jereer logo"
            style={{ width: "100%", height: "100%" }}
          />
        </LogoWrapper>
        <ContentWrapper>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {msg && <p style={{ color: "green" }}>{msg}</p>}

          <form onSubmit={handleLogin}>
            <InputDiv>
              <Input
                aria-label="Enter your email address"
                name="email"
                type="email"
                placeholder="Email address"
                onChange={(e) => handleInputChange(e)}
                value={values.email}
              />
            </InputDiv>
            <InputDiv>
              <Input
                aria-label="Enter your password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => handleInputChange(e)}
                value={values.password}
              />
            </InputDiv>
            <InputDiv>
              <Button
                variant="contained"
                color="primary"
                text="Login"
                type="submit"
                disabled={isInvalid}
                className="submit-btn"
                style={{ width: "100%", height: "50px" }}
              />
            </InputDiv>
          </form>
          <Link to={ROUTES.SIGN_UP} className="signup-option">
            <Paragraph>Not a member yet?! Click to sign up</Paragraph>
          </Link>
        </ContentWrapper>
      </Wrapper>
    </UserContext.Provider>
  );
}

export default Login;
