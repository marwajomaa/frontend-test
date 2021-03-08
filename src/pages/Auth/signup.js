import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as ROUTES from "../../constants/routes";
import { auth } from "../../firebase";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../assets/jereer-logo.png";
import {
  Wrapper,
  ContentWrapper,
  LogoWrapper,
  InputDiv,
  Paragraph,
} from "./style.js";

function Signup() {
  const history = useHistory();
  const [values, setValues] = useState({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [createdUser, setCreateUser] = useState();
  const [continueSignup, setContinueSignup] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const users = await axios.post("https://localhost:8080/users");
      console.log(users);
    };
    getUsers();
  }, []);

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
      console.log(createdUser, "createdUser---------------------------");
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
    e.preventDefault();
    const newUser = {
      userId: createdUser.user.uid,
      username: values.username.toLowerCase(),
      emailAddress: values.email.toLowerCase(),
      phoneNumber: values.phoneNum,
      password: values.password,
      token: createdUser.user.refreshToken,
    };

    try {
      const newLocal = `${process.env.REACT_APP_LOCAL_URL}/api/users/save-user`;
      const res = await axios.post(newLocal, newUser);
      setMsg(res.data.msg);
      history.push(ROUTES.LANDING);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    document.title = "Signup | Jereer";
  }, []);

  return (
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
        {msg && <p>{msg}</p>}
        {!continueSignup && (
          <form onSubmit={handleSignUp}>
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
            <Button
              variant="contained"
              color="primary"
              text="Continue"
              type="submit"
              className="submit-btn"
              style={{ width: "100%", height: "50px" }}
            />
          </form>
        )}
        {continueSignup && (
          <form onSubmit={saveUser}>
            <>
              <InputDiv>
                <Input
                  aria-label="Enter your username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => handleInputChange(e)}
                  value={values.username}
                />
              </InputDiv>
              <InputDiv>
                <Input
                  aria-label="Enter your phone number"
                  name="phoneNum"
                  type="text"
                  placeholder="Phone number"
                  onChange={(e) => handleInputChange(e)}
                  value={values.phoneNum}
                />
              </InputDiv>
              <InputDiv>
                <Button
                  variant="contained"
                  color="primary"
                  text="Sign Up"
                  type="submit"
                  className="submit-btn"
                  style={{ width: "100%", height: "50px" }}
                />
              </InputDiv>
            </>
          </form>
        )}
      </ContentWrapper>
    </Wrapper>
  );
}

export default Signup;
